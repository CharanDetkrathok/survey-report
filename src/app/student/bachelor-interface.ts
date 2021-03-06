export interface disclosureResponse {
  HEADER_1_TH: string;
  HEADER_2_TH: string;
  DETAIL_1_OF_HEADER_1_TH: string;
  DETAIL_2_OF_HEADER_1_TH: string;
  DETAIL_3_OF_HEADER_1_TH: string;
  DETAIL_1_OF_HEADER_2_TH: string;
  DETAIL_2_OF_HEADER_2_TH: string;
  DETAIL_3_OF_HEADER_2_TH: string;
  DETAIL_4_OF_HEADER_2_TH: string;
  DETAIL_5_OF_HEADER_2_TH: string;
  DETAIL_6_OF_HEADER_2_TH: string;
  DETAIL_7_OF_HEADER_2_TH: string;
  CONSENT_TO_DISCLOSURE_TH: string;
  HEADER_1_EN: string;
  HEADER_2_EN: string;
  DETAIL_1_OF_HEADER_1_EN: string;
  DETAIL_2_OF_HEADER_1_EN: string;
  DETAIL_3_OF_HEADER_1_EN: string;
  DETAIL_1_OF_HEADER_2_EN: string;
  DETAIL_2_OF_HEADER_2_EN: string;
  DETAIL_3_OF_HEADER_2_EN: string;
  DETAIL_4_OF_HEADER_2_EN: string;
  DETAIL_5_OF_HEADER_2_EN: string;
  DETAIL_6_OF_HEADER_2_EN: string;
  DETAIL_7_OF_HEADER_2_EN: string;
  CONSENT_TO_DISCLOSURE_EN: string;
  CONFIRM_TH: string;
  CONFIRM_EN: string;
}



export interface bechelorArticlesNoDistinctResponse {
  PART_ID: string;
  ARTICLE_NO: string;
}

export interface bechelorArticlesAndChoicesResponse {
  PART_ID: string;
  ARTICLE_NO: string;
  ARTICLE_SUB_NO: string;
  ARTICLE_CONTENT_TH: string;
  ARTICLE_CONTENT_EN: string;
  ANSWER_INPUTS: string;
  ANSWER_CHOICES: string;
  ANSWER_CHECKBOX: string;
  ANSWER_REQUIRED: string;
  ANSWER: string;
  CHOICES: bechelorChoices[];
  INPUTS: bechelorInputs[];
  CHECKBOXS: bechelorCheckboxs[];
}

interface bechelorChoices {
  CHOICE_NO: string;
  CHOICE_SUB_NO: string;
  CHOICE_VALUED: string;
  CHOICE_CONTENT_TH: string;
  CHOICE_CONTENT_EN: string;
}
interface bechelorInputs {
  INPUT_NO: string;
  INPUT_SUB_NO: string;
  INPUT_VALUED: string;
  INPUT_CONTENT_TH: string;
  INPUT_CONTENT_EN: string;
}
interface bechelorCheckboxs {
  CHECKBOX_NO: string;
  CHECKBOX_SUB_NO: string;
  CHECKBOX_VALUED: string;
  CHECKBOX_CONTENT_TH: string;
  CHECKBOX_CONTENT_EN: string;
}

export interface bechelorPartsOfArticlesRepose {
  PART_ID: string;
  PART_CONTENT_TH: string;
  PART_CONTENT_EN: string;
}

export interface headersRepose {
  HEADER_ID: string;
  HEADER_TITLE: string;
  HEADER_CONTENT_TH: string;
  HEADER_CONTENT_EN: string;
  HEADER_DIRECTION_TH: string;
  HEADER_DIRECTION_EN: string;
}

export interface RegionalCenterResponse {
  REGIONAL_NO: string;
  REGIONAL_NAME: string;
  REGIONAL_NAME_ENG: string;
}