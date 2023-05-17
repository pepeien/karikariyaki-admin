import { InHouseLang } from '@interfaces';

export default {
	LANGUAGE_DISPLAY_NAME: 'English (US)',

	/**
	 * Dialog
	 */
	DIALOG_CONFIRM_BUTTON: 'Confirm',
	DIALOG_CANCEL_BUTTON: 'Cancel',

	/**
	 * Component
	 */
	FILE_INPUT_TITLE: 'Drag & Drop or Browse for the file',

	/**
	 * Login
	 */
	LOGIN_USERNAME_INPUT_TITLE: 'Username',
	LOGIN_BUTTON_TITLE: 'Log In',

	/**
	 * Menu
	 */
	MENU_EDIT_TITLE: 'Edit',
	MENU_TRANSLATE_TITLE: 'Language',
	MENU_LOG_OUT_TITLE: 'Log Out',

	MENU_HOME_TITLE: 'Home',

	MENU_REGISTRY_TITLE: 'Registry',

	MENU_REGISTRY_EVENT_TITLE: 'Event',
	MENU_REGISTRY_EVENT_INDEX_TITLE: 'Item',
	MENU_REGISTRY_EVENT_ORDER_TITLE: 'Order',

	MENU_REGISTRY_MENU_TITLE: 'Menu',

	MENU_REGISTRY_OPERATOR_TITLE: 'Operator',

	MENU_REGISTRY_PRODUCT_TITLE: 'Product',
	MENU_REGISTRY_PRODUCT_INDEX_TITLE: 'Item',

	MENU_REGISTRY_PRODUCT_VARIANT_TITLE: 'Variant',

	/**
	 * Registry
	 */
	REGISTRY_MENU_REALM_INPUT: 'Realm',
	REGISTRY_MENU_TITLE_INPUT: 'Title',
	REGISTRY_MENU_ROUTE_INPUT: 'Route',
	REGISTRY_MENU_PARENT_INPUT: 'Parent Menu',
	REGISTRY_MENU_ICON_INPUT: 'Icon',

	REGISTRY_EVENT_NAME_INPUT: 'Name',

	REGISTRY_EVENT_ORDER_EVENT_INPUT: 'Event',
	REGISTRY_EVENT_ORDER_STATUS_INPUT: 'Status',
	REGISTRY_EVENT_ORDER_OPERATOR_INPUT: 'Operator',
	REGISTRY_EVENT_ORDER_CLIENT_INPUT: 'Client',
	REGISTRY_EVENT_ORDER_PRODUCT_INPUT: 'Product',
	REGISTRY_EVENT_ORDER_PRODUCT_VARIANT_INPUT: 'Product Variant',

	REGISTRY_OPERATOR_DISPLAY_NAME_INPUT: 'Display Name',
	REGISTRY_OPERATOR_USER_NAME_INPUT: 'User Name',
	REGISTRY_OPERATOR_PHOTO_INPUT: 'Photo',

	REGISTRY_PRODUCT_NAME_INPUT: 'Name',

	REGISTRY_PRODUCT_VARIANT_NAME_INPUT: 'Name',
	REGISTRY_PRODUCT_VARIANT_PRODUCT_INPUT: 'Product',

	/**
	 * Table
	 */
	TABLE_ENTRY_EDIT_TITLE: 'Edit',
	TABLE_ENTRY_DELETE_TITLE: 'Delete',

	/**
	 * View
	 */
	REGISTRY_EDITOR_CREATION_TITLE: 'Creation',
	REGISTRY_EDITOR_EDITION_TITLE: 'Edition',
	REGISTRY_EDITOR_CREATION_ACTION: 'Create',
	REGISTRY_EDITOR_EDITION_ACTION: 'Edit',
	REGISTRY_EDITOR_CANCEL_ACTION: 'Cancel',

	EVENT_VIEW_TITLE: 'Event',
	EVENT_NEW_TITLE: 'New Event',
	EVENT_REGISTRY_DELETE_MESSAGE:
		'Do you really want to delete this event ? This action is ireversable',

	EVENT_ORDER_VIEW_TITLE: 'Order',
	EVENT_ORDER_NEW_TITLE: 'New Order',
	EVENT_ORDER_REGISTRY_DELETE_MESSAGE:
		'Do you really want to delete this order ? This action is ireversable',

	MENU_VIEW_TITLE: 'Menu',
	MENU_NEW_TITLE: 'New Menu',
	MENU_REGISTRY_DELETE_MESSAGE:
		'Do you really want to delete this menu ? This action is ireversable',

	OPERATOR_VIEW_TITLE: 'Operator',
	OPERATOR_NEW_TITLE: 'New Operator',
	OPERATOR_REGISTRY_DELETE_MESSAGE:
		'Do you really want to delete this operator ? This action is ireversable',

	PRODUCT_VIEW_TITLE: 'Product',
	PRODUCT_NEW_TITLE: 'New Product',
	PRODUCT_REGISTRY_DELETE_MESSAGE:
		'Do you really want to delete this product ? This action is ireversable',

	PRODUCT_VARIANT_VIEW_TITLE: 'Product Variant',
	PRODUCT_VARIANT_NEW_TITLE: 'New Product Variant',
	PRODUCT_VARIANT_REGISTRY_DELETE_MESSAGE:
		'Do you really want to delete this product variant ? This action is ireversable',

	/**
	 * API Error
	 */
	ERROR_EVENT_DATE_REQUIRED: 'Event date is required',
	ERROR_EVENT_DATE_DUPLICATED: 'Two events cannot be held at the same day',
	ERROR_EVENT_INVALID: 'Event data is invalid',
	ERROR_EVENT_NOT_FOUND: 'Event was not found',
	ERROR_EVENT_NAME_REQUIRED: 'Event name is required',
	ERROR_EVENT_ORDER_INVALID: 'Event order is invalid',
	ERROR_EVENT_ORDER_DUPLICATED: 'Event order is duplicated',

	ERROR_MENU_INVALID: 'Menu data is invalid',
	ERROR_MENU_ICON_INVALID: 'Menu icon is invalid',
	ERROR_MENU_NOT_FOUND: 'Menu was not found',
	ERROR_MENU_REALM_REQUIRED: 'Menu realm is required',
	ERROR_MENU_ROUTE_DUPLICATED: 'Menu route is duplicated',
	ERROR_MENU_TITLE_DUPLICATED: ' Menu title is duplicated',
	ERROR_MENU_TITLE_REQUIRED: 'Menu title is required',

	ERROR_OPERATOR_DISPLAY_NAME_GREATER_THAN_MAX_LENGTH:
		'Operator display name is greater than the max length',
	ERROR_OPERATOR_DISPLAY_NAME_GREATER_THAN_MIN_LENGTH:
		'Operator display name is less than the min length',
	ERROR_OPERATOR_DISPLAY_NAME_REQUIRED: 'Operator display name is required',
	ERROR_OPERATOR_INVALID: 'Operator data is invalid',
	ERROR_OPERATOR_NOT_FOUND: 'Operator was not found',
	ERROR_OPERATOR_USER_NAME_DUPLICATED: 'Operator user name is duplicated',
	ERROR_OPERATOR_USER_NAME_GREATER_THAN_MAX_LENGTH:
		'Operator user name is greater than the max length',
	ERROR_OPERATOR_USER_NAME_LESS_THAN_MIN_LENGTH: 'Operator user name is less than the min length',
	ERROR_OPERATOR_USER_NAME_REQUIRED: 'Operator user name is required',
	ERROR_OPERATOR_PHOTO_INVALID: 'Operator photo is invalid',

	ERROR_ORDER_CLIENT_NAME_GREATER_THAN_MAX_LENGTH:
		'Order client name is greater than the max length',
	ERROR_ORDER_CLIENT_NAME_LESS_THAN_MIN_LENGTH: 'Order client name is less than the min length',
	ERROR_ORDER_CLIENT_NAME_REQUIRED: 'Order client name is required',
	ERROR_ORDER_EVENT_INVALID: 'Order event is invalid',
	ERROR_ORDER_EVENT_REQUIRED: 'Order event is required',
	ERROR_ORDER_INVALID: 'Order is invalid',
	ERROR_ORDER_ITEM_INVALID: 'Order item is invalid',
	ERROR_ORDER_ITEM_REQUIRED: 'Order item is required',
	ERROR_ORDER_ITEM_VARIANT_INVALID: 'Order item variant is invalid',
	ERROR_ORDER_NOT_FOUND: 'Order was not found',
	ERROR_ORDER_OPERATOR_INVALID: 'Order operator is invalid',
	ERROR_ORDER_OPERATOR_REQUIRED: 'Order operator is required',

	ERROR_PRODUCT_INVALID: 'Product is invalid',
	ERROR_PRODUCT_NAME_DUPLICATED: 'Product name is duplicated',
	ERROR_PRODUCT_NAME_GREATER_THAN_MAX_LENGTH: 'Product name is greater than the max length',
	ERROR_PRODUCT_NAME_LESS_THAN_MIN_LENGTH: 'Product name is less than the min length',
	ERROR_PRODUCT_NAME_REQUIRED: 'Product name is required',
	ERROR_PRODUCT_NOT_FOUND: 'Product was not found',
	ERROR_PRODUCT_VARIANT_DUPLICATED: 'Product variant is duplicated',
	ERROR_PRODUCT_VARIANT_INVALID: 'Product variant is invalid',

	ERROR_VARIANT_INVALID: 'Product variant is invalid',
	ERROR_VARIANT_NAME_DUPLICATED: 'Product variant name is duplicated',
	ERROR_VARIANT_NAME_GREATER_THAN_MAX_LENGTH:
		'Product variant name is is greater than the max length',
	ERROR_VARIANT_NAME_LESS_THAN_MIN_LENGTH: 'Product variant name is less than the min length',
	ERROR_VARIANT_NAME_REQUIRED: 'Product variant name is required',
	ERROR_VARIANT_NOT_FOUND: 'Product variant was not found',
	ERROR_VARIANT_PRODUCT_INVALID: 'Product variant product is invalid',
	ERROR_VARIANT_PRODUCT_REQUIRED: 'Product variant product is required',

	ERROR_JWT_SETTINGS_INVALID: 'JWT settings are invalid, please contact the administrator',
	ERROR_JWT_ACCESS_TOKEN_SETTINGS_INVALID:
		'JWT access token settings are invalid, please contact the administrator',
	ERROR_JWT_ACCESS_TOKEN_NOT_FOUND: 'Access token was not found',
	ERROR_JWT_ACCESS_TOKEN_INVALID: 'Access token is invalid',
	ERROR_JWT_REFRESH_TOKEN_SETTINGS_INVALID:
		'JWT refresh token settings are invalid, please contact the administrator',
	ERROR_JWT_REFRESH_TOKEN_NOT_FOUND: 'Refresh token was not found',
	ERROR_JWT_REFRESH_TOKEN_INVALID: 'Refresh token is invalid',
} as InHouseLang;
