import { objectEntries } from '@tim-mhn/common/objects';

const HOST_DOMAIN = 'https://imagedelivery.net/Zq_y_wPpJ_fjpNFHNAHfpQ/';

const ICONS_HOST_KEYS = {
  ARROW_DOWN_GRAY: 'c7ceeda3-d4e1-48a2-52a5-b7bb185ce000',
  ARROW_DOWN_BLUE: 'dbf44a41-409a-48fd-7736-af2c4fc62b00',
  ARROW_LEFT: 'a1d43235-6808-4092-52a2-30c38c56a800',
  ARROW_LEFT_GRAY: '6ca7728f-f29a-4c0c-3a1f-c284c2e1bd00',
  ARROW_RIGHT_GRAY: '1bc47dfc-88fa-4fc9-19db-0fbd9decc200',
  ARROW_UP_GRAY: '76cc8e0d-5b59-4e55-b366-c23c9f1af000',
  ARROW_UP_BLUE: '91a67ab0-823b-4c6f-049d-74308237e300',
  ASTRONAUT: 'a8d2f5db-4b7f-4ec9-6ce5-b9344ec18e00',
  AWARD: 'c8212016-8fd2-4880-3b81-6b81f6d52a00',
  BAN_RED: 'fbf5089c-7c95-4873-525f-6614240d2400',
  BAR_CHART_BLUE: '1da2c1a3-c36f-4500-d3d2-26e95cb1c600',
  BAR_CHART_GRAY: '63fcf57c-3ae6-41d8-7825-0b4604f03c00',
  BELL: '2ae26e50-3a73-428f-087c-6f3a2d25bf00',
  BOOK_OUTLINE_GRAY: 'aadf3c2b-ce81-44e7-4cb5-3cbc19adf500',
  CALENDAR_OUTLINE_GRAY_500: '11b8a096-a0ac-4aee-f553-9d55553c0100',
  CAST_BLUE: '0fda2e65-607b-414f-cd90-364611eaf300',
  CHECK_BLUE: '25d21fb9-7898-477e-b6cd-8817b794fb00',
  CHECK_CIRCLE_GREEN: '0fda2e65-607b-414f-cd90-364611eaf300',
  CHECK_GREEN: '1db31ec2-e5ba-4823-6936-9421add8b300',
  CHECK_WHITE: '168e529e-d893-4b5c-6abb-709c8d313800',
  CIRCLE_WHITE: '49a3f9bf-476d-4176-3620-4465ec9e9600',
  CLIPBOARD_LIST: '3fcb2e8a-a0b7-4fcd-a4de-f860a11df200',
  COPY_CLIPBOARD: 'c37a3bda-c508-4f6f-3b7d-cef70eb61300',
  DOWNLOAD_BLUE: '1acb9242-ed9d-4b22-5639-5bd4e8b2d300',
  DOWNLOAD_OUTLINE_WHITE: '022914f8-3c34-4f57-f6f9-9d1adb7cc300',
  EXCLAMATION_CIRCLE_RED: '815fd960-ed24-4c10-071a-bebe1ab6ac00',
  EXTERNAL_LINK_BLUE: '93f41ac2-ac17-4a24-6430-bf91d0842900',
  EYE_OPEN: '7b0d3426-56f7-42ec-4217-3ddd3140ee00',
  EYE_CLOSED: 'eed93d98-3ae2-4e67-f081-4a5c22f09700',
  FIRE_CLUSTER_RED_HIGH: 'assets/icons/map/ic-fire-map-cluster-high.svg',
  FIRE_CLUSTER_RED_MEDIUM: 'assets/icons/map/ic-fire-map-cluster-medium.svg',
  FIRE_GRAY: 'assets/icons/map/fire-solid-gray-300.svg',
  FIRE_RED_HIGH: 'assets/icons/map/ic-fire-map-pin-high.svg',
  FIRE_RED_LOW: 'assets/icons/map/ic-fire-map-pin-low.svg',
  FIRE_RED_MEDIUM: 'assets/icons/map/ic-fire-map-pin-medium.svg',
  HORIZONTAL_DOTS: '1acb9242-ed9d-4b22-5639-5bd4e8b2d300',
  INDOOR_BLUE: '7b6a6282-253e-4c45-19d8-d193182a5200',
  INDOOR_GRAY: '17b839e4-2003-4a03-4ddb-26c9fa6ea500',
  KEY_BLUE: 'eb9e0d03-6740-47e9-7225-69e873d62200',
  LIGHTNING_BLUE: '1d4ba2a1-8633-4f4a-8800-c66e851a3500',
  LOCATION_MARKER_BLUE: '1d4ba2a1-8633-4f4a-8800-c66e851a3500',
  LOCATION_MARKER_GRAY: 'faff0c29-7c12-413d-b8a3-68d262e9c300',
  LOCATION_MARKER_OUTLINE_GRAY: 'faff0c29-7c12-413d-b8a3-68d262e9c300',
  MAIL_BLUE: '1d4ba2a1-8633-4f4a-8800-c66e851a3500',
  MAXIMIZE: 'assets/icons/map/maximize-outline-gray-500.svg',
  MOON: '7e965892-dc4f-48bf-9153-b7aa02724500',
  MINUS_GRAY: 'e5eefb40-9a53-4620-b0fe-97abf84cca00',
  NEW_TAB_ICON: 'e5eefb40-9a53-4620-b0fe-97abf84cca00',
  OUTDOOR_BLUE: 'd58e6480-c522-46ca-3ebf-d624faf99c00',
  OUTDOOR_GRAY: '368b9b06-1634-4039-89e7-e26910835c00',
  PENCIL_GRAY: 'c03b8012-1860-4c66-3e63-d7440c8eb500',
  PLUS_BLACK: 'f336d11a-4dc9-461e-2824-f780ff54fc00',
  PLUS_BLUE: '8cc0fbf0-af0b-4bfd-f632-85b60815c900',
  PLUS_GRAY: '51f4b5a6-fa8d-4677-007f-0394e4c13d00',
  PLUS_RED: 'b207fb3d-3295-462f-9fcb-981f92591100',
  PLUS_WHITE: 'e73a2362-4edc-4b3a-ccee-266a1a1d4300',
  QUESTION_MARK_CIRCLE_GRAY: '4e9cf9fe-f718-4a97-cfe6-d855e60e9800',
  QUESTION_MARK_CIRCLE_GRAY_500: 'd58e6480-c522-46ca-3ebf-d624faf99c00',
  REPAIR: 'e8b2a553-3121-4a6c-209b-a83765625200',
  SEARCH: '1c510a3b-a475-4273-de79-cc0e2f6b9a00',
  SERVER_BLUE: 'eb1f2de0-bc84-432c-283a-0937f8f61d00',
  SERVER_GRAY: 'b036bda8-4d80-4efd-52c0-cf1c85176200',
  SETTINGS_GRAY: 'e8ad64a6-cdaa-49f0-f952-e4f499280c00',
  STATION_GRAY: 'assets/icons/station-outline-gray-500.svg',
  STATION_PENDING_BLUE: 'assets/icons/station-pending-outline-blue-500.svg',
  STATION_PUBLISHED_BLUE: 'assets/icons/station-published-blue-500.svg',
  STATION_UNPUBLISHED_BLUE:
    'assets/icons/station-unpublished-outline-blue-500.svg',
  THREE_LAYER_BLUE: '9edcb074-5bda-4557-1d9a-a6d069727600',
  THREE_LAYER_GRAY: '9edcb074-5bda-4557-1d9a-a6d069727600',
  TRIANGLE_EXCLAMATION: '5eaa943f-e18a-4d69-98ce-dd3388b55c00',
  TRIANGLE_EXCLAMATION_OUTLINE_WHITE: '5eaa943f-e18a-4d69-98ce-dd3388b55c00',
  USER_WHITE: '2d27d3a0-169e-4d63-9842-356e5c587300',
  USERS_OUTLINE_BLUE: 'd4917da3-0d79-45b9-88ec-8d5cb924bd00',
  VERTICAL_DOTS: '43cde2c1-ae7e-4528-893b-aa35d4182200',
  WARNING_CIRCLE_BLUE: 'f275cfa6-be10-4d21-686f-171f23639c00',
  WARNING_CIRCLE_RED: 'c21d4d2d-cc46-4b98-875e-4fb664584d00',
  WARNING_ORANGE: 'f429cb4c-b813-4068-e712-b13fefde2800',
  WARNING_RED: '5eaa943f-e18a-4d69-98ce-dd3388b55c00',
  WYSIWYG_BOLD: '8530f9b5-91ae-4dcf-e2ef-17701f35e300',
  WYSIWYG_ITALIC: 'e7f9b23c-e90a-492f-6062-14cf92327c00',
  WYSIWYG_UNORDERED_LIST: '84dfbc9b-1daf-4224-4f46-9f822b7e8f00',
  X_CIRCLE_RED: '871819e9-124e-41af-56a5-439fc6546a00',
  X_GRAY: '34111e86-4d51-41ef-16ec-0650d757e200',
  X_WHITE: '11ccfe0c-eea4-4c68-db20-026758200600',
};

type Icons = typeof ICONS_HOST_KEYS;

const ICONS: Icons = {} as any as Icons;

function buildImageUrl(key: string) {
  return `${HOST_DOMAIN}${key}/public`;
}

objectEntries(ICONS_HOST_KEYS).forEach(([imageName, imageKey]) => {
  ICONS[imageName] = buildImageUrl(imageKey);
});

export { ICONS };
