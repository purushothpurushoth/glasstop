import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { DataTableColumn, DataTableDetail } from 'src/app/app.interface';
import { CampaignEmployee, CampaignUserReq } from 'src/app/shared/upload-campaign-employees/upload-campaign-employees.interface';

@Component({
  selector: 'glasstop-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges, OnInit, OnDestroy {
  @Input() public data: CampaignEmployee[] | any[] = [];
  @Input() public columns: DataTableColumn[] = [];
  @Input() public isTableLoading: boolean = false;
  @Input() public detail: DataTableDetail = {
    id: 'campaignUserId',
    searchTotalCount: 0,
    listName: '',
    placeholder: 'Search'
  };
  @Input() public isStaticData: boolean = false;
  @Input() public paginationId: string = 'paginationId-0';
  @Output() public emitPageLoad = new EventEmitter<number>();
  @Output() public emitIdsToRemove = new EventEmitter<CampaignUserReq>();
  @Output() public emitSearchText = new EventEmitter<string | undefined>()
  public selectedList: CampaignEmployee[] | any[] = [];
  public page: number = 1;
  public pageSize: number = 10;
  public skeletonLoaderList: number[] = [1,2,3,4,5,6,7,8,9,10];
  public isAllDataSelected: boolean = false;
  public searchText: string = '';
  private searchSubject = new Subject<string | undefined>();
  private searchSubscription: Subscription = new Subscription();

  // Checks if the selectAll checkbox is selected
  get isAllSelected() {
    let isSelected = false;
    if (this.data && this.data.length) {
      isSelected = this.data.every((item) => item.isSelected);
    }
    return isSelected;
  }

  // To display page info
  get pageInfo() {
    const start = ((this.page - 1) * this.pageSize) + 1;
    let end = this.page * this.pageSize;
    if (end > this.detail.searchTotalCount) {
      end = this.detail.searchTotalCount;
    }
    return `${start} - ${end} of ${this.detail.searchTotalCount}`;
  }

  ngOnChanges(): void {
    this.updateDataBasedOnSelectedList();
  }

  ngOnInit(): void {
    this.searchInputSubscription();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  /**
   * @description Method to update the data based on selected list
   */
  private updateDataBasedOnSelectedList() {
    if (this.data.length && this.selectedList.length) {
      this.data = this.data.map((item) => {
        const selectedItemIndex = this.selectedList.findIndex((i) => i[this.detail.id] === item[this.detail.id]);
        if (selectedItemIndex > -1) {
          item.isSelected = true;
        }
        return item;
      });
    }
  }

  /**
   * @description Method to update selected row list
   * @param {Event} event 
   * @param {CampaignEmployee} item 
   */
  public updateSelectedList(event: Event, item: CampaignEmployee | any) {
    const indexOfSelectedItem = this.selectedList.findIndex((obj) => {
      return item[this.detail.id] == obj[this.detail.id];
    });
    if ((<HTMLInputElement>event.target).checked) {
      if (indexOfSelectedItem < 0) {
        this.selectedList.push(item);
      }
    } else {
      this.isAllDataSelected = false;
      this.selectedList.splice(indexOfSelectedItem, 1);
    }
  }

  /**
   * @description Method to select all checkbox functionality
   * @param {Event} event 
   */
  public selectAll(event: Event) {
    const ischecked = (<HTMLInputElement>event.target).checked;
    this.data = this.data.map(item => {
      item.isSelected = ischecked;
      this.updateSelectedList(event, item);
      return item;
    });
  }

  /**
   * @description Mehod to clear selection
   */
  public clearSelection() {
    this.isAllDataSelected = false;
    this.selectedList = [];
    this.data = this.data.map((item) => {
      item.isSelected = false;
      return item;
    });
  }

  /**
   * @description Method to emit page load event on pagination
   */
  public loadDataOnPagination() {
    if (!this.isStaticData) {
      this.emitPageLoad.next(this.page - 1);
    }
  }

  /**
   * @description Method to remove/delete list items
   */
  public removeData() {
    if (this.isAllDataSelected) {
      this.page = 1;
      this.emitIdsToRemove.next({
        deleteCampaignUserIds: '',
        isDeleteAll: true
      });
    } else {
      const idsToRemove: number[] = [];
      this.selectedList.forEach((item) => {
        idsToRemove.push(item[this.detail.id]);
      });
      if (idsToRemove.length) {
        this.page = 1;
        this.emitIdsToRemove.next({
          deleteCampaignUserIds: idsToRemove.join(),
          isDeleteAll: false
        });
      }
    }
    this.isAllDataSelected = false;
    this.selectedList = [];
  }

  /**
   * @description Method to emit search input and load list
   */
  public searchInputSubscription() {
    this.searchSubscription = this.searchSubject
    .pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
    .subscribe((searchText) => {
      this.page = 1;
      this.emitSearchText.next(searchText);
    });
  }

  /**
   * @description Method to trigger search
   */
  public onSearchInput() {
    this.searchSubject.next(this.searchText?.trim());
  }
}
