export const CONSTANTS_UPLOAD_EXCEL_MAX_SIZE = 25870370;
export const ROUTES = {
  SIGN_UP: 'sign-up',
  CEO_INVITE: 'ceo-invite',
};

export const ACCEPTED_PROFILE_ICON_TYPE = [
  'image/png',
  "image/jpeg"
];

export const MODAL_TYPE = {
  IMAGE_UPLOAD_MODAL: 'imageUploadModal',
  IFRAME_MODAL: 'iframeModal',
  UPLOAD_LOADER_MODAL: 'uploadLoaderModal',
  UPLOAD_EMPLOYEES_ERROR_MODAL: 'uploadEmployeesErrorModal',
  UPLOAD_CONFIRMATION_MODAL: 'uploadConfirmationModal'
}

export const EVENT_TYPE = {
  SUCCESS: 'Success',
  ERROR: 'Error'
}

export const GLASSDOOR_URLS = [
  "https://www.glassdoor.com/",
  "https://www.glassdoor.co.in/"
]

export const NO_PROFILE_ICON_ROUTE = [
  "/home/sign-up",
  "/home",
]

export const MESSAGE_ON_CEO_INVITE =
  'Glasstop has thought through everything. I’m glad my HR got me involved. The emails to request reviews now goes out automagically directly from me & that has crazily ramped up our ratings.';
export const MESSAGE_ON_SIGNUP =
  "We grew to 4+ start in less than 3 months from 3.5. Testimonials collection is now automated and we don't need to ask employees or candidates to drop us reviews anymore!";
export const SAMPLE_EXCEL_URL = "assets/excel/Sample_Excel.xlsx";

export const RESPONSE_STATUS = {
  SUCCESS: 'Success',
  ERROR :'Error'
}

export const RESPONSE_STATUS_CODE = {
  SUCCESS: 200
};

export const ERROR_MESSAGE = {
  SAVE_USER :'Error occured while saving user!',
  GENERIC : 'Oops! Something went wrong.',
  INVALID_FILE_TYPE: 'Invalid file format. Please select a required format.',
  TRY_AGAIN_LATER : 'Oops! Something went wrong. Please try again later.',
  FILE_SIZE : 'File size should be less than 25 MB',
  REMOVE_EMPLOYEE_ERR : 'Failed to remove employees due to some error.',
  EXCEL_MAX_ROWS_ERR : 'Excel should contain maximum 1000 rows.',
  EMPTY_FILE_ERR : 'Uploaded file is empty!'
};

export const CHAT_GPT_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
}


export const ERROR_FIELDS = {
  FIRST_NAME: "First Name",
  LAST_NAME: "Last Name",
  EMAIL: "Email"
}