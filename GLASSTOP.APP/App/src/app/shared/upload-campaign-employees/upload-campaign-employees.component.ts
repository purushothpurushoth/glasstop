import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IEmployee } from 'src/app/app.interface';
import { MultiFieldsModalComponent } from 'src/app/custom-components/multi-fields-modal/multi-fields-modal.component';
import { CampaignService } from 'src/app/service/campaign-service/campaign.service';
import { ToastService } from 'src/app/service/toast-service/toast.service';
import * as XLSX from 'xlsx';
import { MAX_EMPLOYEE_COUNT } from '../../../environments/environment';
import { CONSTANTS_UPLOAD_EXCEL_MAX_SIZE, ERROR_MESSAGE, MODAL_TYPE, RESPONSE_STATUS } from '../../app.constants';
import { CampaignEmployee, CampaignUserReq, CampaignUserRes, TABLE_COLUMNS } from './upload-campaign-employees.interface';
@Component({
  selector: 'glasstop-employee-list',
  templateUrl: './upload-campaign-employees.component.html',
  styleUrls: ['./upload-campaign-employees.component.scss'],
})
export class UploadCampaignEmployeesComponent implements OnInit {
  public tableColumns = TABLE_COLUMNS;
  public isUploadSectionFocused: boolean = false;
  public isEmpListLoaded: boolean = false;
  public employeeList: CampaignEmployee[] = [];
  public searchTotalCount: number = 0;
  public startRowIndex: number = 0;
  public searchText: string = '';
  public isLoading: boolean = false;
  public isTableLoading: boolean = false;
  public filelist: IEmployee[] | [] = [];
  public modalRef?: BsModalRef | null;

  constructor(
    private bsModalService: BsModalService,
    private campaignService: CampaignService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.showDownloadSamplePopup();
  }

  /**
   * @description Method to load employee list
   */
  public loadEmployeeList() {
    this.campaignService
      .getEmployeeList(this.startRowIndex, this.searchText)
      .subscribe((res: CampaignUserRes) => {
        this.employeeList = [];
        if (res && res.campaignEndUser && res.campaignEndUser.length) {
          this.employeeList = res.campaignEndUser.map((emp) => {
            emp.isSelected = false;
            return emp;
          });
        }
        this.searchTotalCount = res?.searchTotalCount || 0;
        this.isEmpListLoaded = res?.totalCount > 0;
        if (!this.isEmpListLoaded) {
          this.searchText = '';
          this.startRowIndex = 0;
        }
        this.isLoading = false;
        this.isTableLoading = false;
      });
  }

  /**
   * @description Method to load employee list on search
   * @param {string} searchText
   */
  public loadEmployeeListOnSearch(searchText: string = '') {
    this.searchText = searchText;
    this.startRowIndex = 0;
    this.isTableLoading = true;
    this.loadEmployeeList();
  }

  /**
   * @description Method to load employee list on pagination
   * @param {number} startIndex
   */
  public loadEmployeeListOnPagination(startIndex: number = 0) {
    this.isTableLoading = true;
    this.startRowIndex = startIndex;
    this.loadEmployeeList();
  }

  /**
   * @description Method to remove employees from list
   * @param {CampaignUserReq} removePayload
   */
  public removeEmployees(removePayload: CampaignUserReq) {
    if (removePayload && (removePayload.deleteCampaignUserIds || removePayload.isDeleteAll)) {
      this.campaignService.removeEmployees(removePayload.deleteCampaignUserIds, removePayload.isDeleteAll, this.searchText)
        .subscribe({
          next: (res) => {
            if (res && res.statusCode === 200) {
              if (removePayload.isDeleteAll) {
                this.toastService.showSuccessToast(`All employees has been removed successfully.`);
              } else if (removePayload.deleteCampaignUserIds) {
                const removeList = removePayload.deleteCampaignUserIds.split(",");
                this.toastService.showSuccessToast(`${removeList?.length} employee(s) has been removed from the list.`);
              }
            } else {
              this.toastService.showErrorToast(ERROR_MESSAGE.REMOVE_EMPLOYEE_ERR);
            }
          },
          error: () => {
            this.toastService.showErrorToast(ERROR_MESSAGE.REMOVE_EMPLOYEE_ERR);
          },
          complete: () => {
            this.isTableLoading = true;
            this.startRowIndex = 0;
            this.loadEmployeeList();
          }
        }
        );
    }
  }

  /**
   * @description: Method to apply background color effect on upload section when upload button click.
   */
  public focusUploadSection() {
    this.isUploadSectionFocused = true;
    setTimeout(() => {
      this.isUploadSectionFocused = false;
    }, 2000);
  }

  /**
   * @description: Method to apply drag over when upload file.
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  /**
   * @description: Method to apply drag over when upload file and will call file chang method.
   */
  onDropSuccess(event: DragEvent) {
    event.preventDefault();
    let dragFileList = event.dataTransfer?.files; // Array of all files
    if (dragFileList && dragFileList.length < 2) {
      this.onFileChange(dragFileList);
    } else {
      return;
    }
  }

  /**
   * @description: Method to trigger when upload button click.
   */
  onChange(event: any) {
    event?.target?.files && this.onFileChange(event.target.files);
    event.target.value = '';
  }
  /**
   * @description: Method to apply for file validation like size, format and convert to json format from uploaded excel file.
   */
  private onFileChange(files: FileList) {
    if (files.length) {
      const file = files[0];
      let type = file.name.split('.').pop();
      if (file.size < CONSTANTS_UPLOAD_EXCEL_MAX_SIZE) {
        if (type === 'xlsx' || type === 'xls') {
          this.excelFiletoJSON(file);
        } else if (type === 'csv') {
          this.csvFileToJSON(file);
        } else {
          this.toastService.showErrorToast(ERROR_MESSAGE.INVALID_FILE_TYPE)
        }
      } else {
        this.toastService.showErrorToast(ERROR_MESSAGE.FILE_SIZE);
      }
    }
  }
  /**
   * @description: Popup will show when redirected from employee list, it will close once download the sample timeout
   */
  public showDownloadSamplePopup() {
    const modalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-md modal-dialog-centered',
      initialState: {
        title: 'Download Sample Upload Template',
        content:
          'Click the button below to download our sample template. Fill in the employee data and save it as a CSV/xlsx file. Then, upload the file to add your employees to the feedback campaign.',
        trueButtonText: 'Download sample template',
        modalType: 'downloadSampleTemplate'
      },
    };
    this.modalRef = this.bsModalService.show(
      MultiFieldsModalComponent,
      modalOptions
    );
  }
  /**
   * @description: Method to apply to convert to json format from uploaded excel file.
   */
  excelFiletoJSON(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const arrayBuffer: any = fileReader.result;
      const data = new Uint8Array(arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const arraylist: Array<IEmployee> = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
      });
      if (arraylist.length > MAX_EMPLOYEE_COUNT) {
        this.filelist = [];
        this.toastService.showErrorToast(ERROR_MESSAGE.EXCEL_MAX_ROWS_ERR);
      } else {
        this.filelist = arraylist;
        const fileName = file?.name?.substring(0, file?.name?.lastIndexOf('.')) || file?.name;
        this.confirmFileUpload(fileName);
      }
    };
  }
  /**
   * @description: Method to read csv file and convert it into JSON .
   */
  public async csvFileToJSON(file: File) {
    let jsonFormat: Array<IEmployee> = [];
    try {
      const reader: any = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event: Event) => {
        const jsonData = [];
        const headers = [];
        const rows = reader.result.split('\r\n');
        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].split(',');
          const rowData: any = {}
          for (let j = 0; j < cells.length; j++) {
            if (i == 0) {
              let headerName = cells[j].trim();
              headers.push(headerName);
            } else {
              let key = headers[j];
              if (key) {
                rowData[key] = cells[j].trim();
              }
            }
          }
          if (i != 0) {
            jsonData.push(rowData);
          }
        }

        //displaying the json result in string format
        //  jsonData;
        jsonFormat = jsonData;
        if (jsonFormat.length > MAX_EMPLOYEE_COUNT) {
          this.filelist = [];
          this.toastService.showErrorToast(ERROR_MESSAGE.EXCEL_MAX_ROWS_ERR);
        } else {
          this.filelist = jsonFormat;
          const fileName = file?.name?.substring(0, file?.name?.lastIndexOf('.')) || file?.name;
          this.confirmFileUpload(fileName);
        }
      };
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @description Method to show confirmation modal before file upload
   * @param {string} fileName 
   */
  private confirmFileUpload(fileName: string) {
    if (this.filelist && this.filelist.length) {
      let employeeList: CampaignEmployee[] = [];

      // Generate employee list payload from file list
      this.filelist.forEach(element => {
        const keys = Object.keys(element);
        const employee: CampaignEmployee = {
          firstName: '',
          lastName: '',
          email: ''
        };
        keys.forEach(key => {
          switch (key) {
            case 'FirstName':
              employee.firstName = element.FirstName;
              break;
            case 'LastName':
              employee.lastName = element.LastName;
              break;
            case 'Email':
              employee.email = element.Email;
              break;
          }
        });
        employeeList.push(employee);
      });

      // Open confirmation dialog
      const modalOptions = {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-lg modal-dialog-centered',
        initialState: {
          modalType: MODAL_TYPE.UPLOAD_CONFIRMATION_MODAL,
          fileName,
          employeeList,
          tableColumns: this.tableColumns
        },
      };
      this.modalRef = this.bsModalService.show(
        MultiFieldsModalComponent,
        modalOptions
      );
      this.modalRef.content.subject.subscribe(
        (response: { status: boolean }) => {
          if (response && response.status) {
            this.saveEmployeeList(fileName, employeeList);
          }
        }
      );  
    } else {
      this.toastService.showErrorToast(ERROR_MESSAGE.EMPTY_FILE_ERR);
    }
  }

  /**
   * @description Method to save uploaded employee list
   * @param {string} fileName
   * @param {CampaignEmployee[]} employeeList
   */
  private saveEmployeeList(fileName: string, employeeList: CampaignEmployee[] = []) {
    const modalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-xl modal-dialog-centered upload-loader-modal',
      initialState: {
        modalType: MODAL_TYPE.UPLOAD_LOADER_MODAL,
        fileName
      },
    };
    this.modalRef = this.bsModalService.show(
      MultiFieldsModalComponent,
      modalOptions
    );
    this.modalRef && (this.modalRef.content.loaderPercentage = 10); // Set loader percentage as 10%
    this.modalRef && (this.modalRef.content.loaderPercentage = 20);
    this.campaignService.saveCampaignUser(employeeList).subscribe({
      next: (res) => {
        if (res && res.statusCode === 200) {
          this.modalRef && (this.modalRef.content.loaderPercentage = 100);
          setTimeout(() => {
            this.modalRef?.hide();
            this.isLoading = true;
            this.startRowIndex = 0;
            this.loadEmployeeList();
            this.toastService.showSuccessToast(`You've successfully imported ${employeeList.length} employee record(s).`);
          }, 500);
        } else {
          this.modalRef?.hide();
          const modalOptions: ModalOptions = {
            backdrop: true,
            ignoreBackdropClick: true,
            class: 'modal-md upload-employee-error', 
            initialState: {
              modalType: MODAL_TYPE.UPLOAD_EMPLOYEES_ERROR_MODAL,
              toast: {
                type: RESPONSE_STATUS.ERROR,
                message: `<div class="fs-12"><span class="fw-600">We couldn't upload file due to invalid input data.<br>
                    ${res.campaignUserValidation!.length} employee(s) data are invalid</span>, please Correct the error(s) and reupload the file</div>`,
                errorData:res.campaignUserValidation
              }
            },
          };
          this.modalRef = this.bsModalService.show(
            MultiFieldsModalComponent,
            modalOptions
          );
        }
      },
      error: (res) => {
        this.modalRef?.hide();
        this.toastService.showErrorToast(ERROR_MESSAGE.GENERIC);
      }
    });
  }
}
