import { InHouseLang } from '@interfaces';

export default {
	LANGUAGE_DISPLAY_NAME: 'Português (Brasil)',

	/**
	 * Dialog
	 */
	DIALOG_CONFIRM_BUTTON: 'Confirmar',
	DIALOG_CANCEL_BUTTON: 'Cancelar',

	/**
	 * Component
	 */
	FILE_INPUT_TITLE: 'Arraste ou Pesquise o arquivo',

	/**
	 * Login
	 */
	LOGIN_USERNAME_INPUT_TITLE: 'Usuário',
	LOGIN_BUTTON_TITLE: 'Entrar',

	/**
	 * Menu
	 */
	MENU_EDIT_TITLE: 'Editar',
	MENU_TRANSLATE_TITLE: 'Idioma',
	MENU_LOG_OUT_TITLE: 'Sair',

	MENU_HOME_TITLE: 'Início',

	MENU_REGISTRY_TITLE: 'Registro',

	MENU_REGISTRY_EVENT_TITLE: 'Evento',
	MENU_REGISTRY_EVENT_INDEX_TITLE: 'Item',
	MENU_REGISTRY_EVENT_ORDER_TITLE: 'Pedido',

	MENU_REGISTRY_MENU_TITLE: 'Menu',

	MENU_REGISTRY_OPERATOR_TITLE: 'Operador',

	MENU_REGISTRY_PRODUCT_TITLE: 'Produto',
	MENU_REGISTRY_PRODUCT_INDEX_TITLE: 'Item',

	MENU_REGISTRY_PRODUCT_VARIANT_TITLE: 'Variante',

	/**
	 * Registry
	 */
	REGISTRY_MENU_REALM_INPUT: 'Dominio',
	REGISTRY_MENU_TITLE_INPUT: 'Título',
	REGISTRY_MENU_ROUTE_INPUT: 'Rota',
	REGISTRY_MENU_PARENT_INPUT: 'Menu Parente',
	REGISTRY_MENU_ICON_INPUT: 'Ícone',

	REGISTRY_EVENT_NAME_INPUT: 'Nome',

	REGISTRY_EVENT_ORDER_EVENT_INPUT: 'Evento',
	REGISTRY_EVENT_ORDER_STATUS_INPUT: 'Status',
	REGISTRY_EVENT_ORDER_OPERATOR_INPUT: 'Operador(a)',
	REGISTRY_EVENT_ORDER_CLIENT_INPUT: 'Cliente',
	REGISTRY_EVENT_ORDER_PRODUCT_INPUT: 'Produto',
	REGISTRY_EVENT_ORDER_PRODUCT_VARIANT_INPUT: 'Variante do produto',

	REGISTRY_OPERATOR_DISPLAY_NAME_INPUT: 'Nome de exibição',
	REGISTRY_OPERATOR_USER_NAME_INPUT: 'Nome de usuário',
	REGISTRY_OPERATOR_PHOTO_INPUT: 'Foto',

	REGISTRY_PRODUCT_NAME_INPUT: 'Nome',

	REGISTRY_PRODUCT_VARIANT_NAME_INPUT: 'Nome',
	REGISTRY_PRODUCT_VARIANT_PRODUCT_INPUT: 'Produto',

	/**
	 * Table
	 */
	TABLE_ENTRY_EDIT_TITLE: 'Editar',
	TABLE_ENTRY_DELETE_TITLE: 'Deletar',

	/**
	 * View
	 */
	REGISTRY_EDITOR_CREATION_TITLE: 'Criação',
	REGISTRY_EDITOR_EDITION_TITLE: 'Edição',
	REGISTRY_EDITOR_CREATION_ACTION: 'Criar',
	REGISTRY_EDITOR_EDITION_ACTION: 'Editar',
	REGISTRY_EDITOR_CANCEL_ACTION: 'Cancelar',

	EVENT_VIEW_TITLE: 'Evento',
	EVENT_NEW_TITLE: 'Novo Evento',
	EVENT_REGISTRY_DELETE_MESSAGE:
		'Você realmente quer excluir este evento ? Esta ação é irreversível',

	EVENT_ORDER_VIEW_TITLE: 'Pedido',
	EVENT_ORDER_NEW_TITLE: 'Novo Pedido',
	EVENT_ORDER_REGISTRY_DELETE_MESSAGE:
		'Você realmente quer excluir este pedido ? Esta ação é irreversível',

	MENU_VIEW_TITLE: 'Menu',
	MENU_NEW_TITLE: 'Novo Menu',
	MENU_REGISTRY_DELETE_MESSAGE:
		'Você realmente quer excluir este menu ? Esta ação é irreversível',

	OPERATOR_VIEW_TITLE: 'Operador',
	OPERATOR_NEW_TITLE: 'Novo Operador',
	OPERATOR_REGISTRY_DELETE_MESSAGE:
		'Você realmente quer excluir este(a) operador(a) ? Esta ação é irreversível',

	PRODUCT_VIEW_TITLE: 'Produto',
	PRODUCT_NEW_TITLE: 'Novo Produto',
	PRODUCT_REGISTRY_DELETE_MESSAGE:
		'Você realmente quer excluir este produto ? Esta ação é irreversível',

	PRODUCT_VARIANT_VIEW_TITLE: 'Variante de Produto',
	PRODUCT_VARIANT_NEW_TITLE: 'Nova Variante de Produto',
	PRODUCT_VARIANT_REGISTRY_DELETE_MESSAGE:
		'Você realmente quer excluir esta variante de produto ? Esta ação é irreversível',

	/**
	 * API Error
	 */
	ERROR_EVENT_DATE_REQUIRED: 'Data do evento é obrigatória',
	ERROR_EVENT_DATE_DUPLICATED: 'Dois eventos não podem acontecer no mesmo dia',
	ERROR_EVENT_INVALID: 'Data do evento é inválida',
	ERROR_EVENT_NOT_FOUND: 'Evento não foi encontrado',
	ERROR_EVENT_NAME_REQUIRED: 'Nome do evento é obrigatório',
	ERROR_EVENT_ORDER_INVALID: 'Pedido do evento é inválido',
	ERROR_EVENT_ORDER_DUPLICATED: 'Pedido do evento já existe',

	ERROR_MENU_INVALID: 'Dados do menu são inválidos',
	ERROR_MENU_ICON_INVALID: 'Ícone do menu é inválido',
	ERROR_MENU_NOT_FOUND: 'Menu não foi encontrado',
	ERROR_MENU_REALM_REQUIRED: 'Realm do menu é obrigatório',
	ERROR_MENU_ROUTE_DUPLICATED: 'Rota do menu já existe',
	ERROR_MENU_TITLE_DUPLICATED: ' Título do menu já existe',
	ERROR_MENU_TITLE_REQUIRED: 'Título do menu é obrigatório',

	ERROR_OPERATOR_DISPLAY_NAME_GREATER_THAN_MAX_LENGTH:
		'Nome de exibição do(a) operador(a) é muito grande',
	ERROR_OPERATOR_DISPLAY_NAME_GREATER_THAN_MIN_LENGTH:
		'Nome de exibição do(a) operador(a) é muito pequeno',
	ERROR_OPERATOR_DISPLAY_NAME_REQUIRED: 'Nome de exibição do operador é obrigatório',
	ERROR_OPERATOR_INVALID: 'Dados do(a) operador(a) são inválidos',
	ERROR_OPERATOR_NOT_FOUND: 'Operador(a) não encontrado(a)',
	ERROR_OPERATOR_USER_NAME_DUPLICATED: 'Nome de usuário(a) do(a) operador(a) já existe',
	ERROR_OPERATOR_USER_NAME_GREATER_THAN_MAX_LENGTH:
		'Nome de usuário(a) do(a) operador(a) é muito grande',
	ERROR_OPERATOR_USER_NAME_LESS_THAN_MIN_LENGTH:
		'Nome de usuário(a) do(a) operador(a) é muito pequeno',
	ERROR_OPERATOR_USER_NAME_REQUIRED: 'Nome de usuário(a) do(a) operador(a) é obrigatório',
	ERROR_OPERATOR_PHOTO_INVALID: 'Foto do(a) operador(a) é inválido',

	ERROR_ORDER_CLIENT_NAME_GREATER_THAN_MAX_LENGTH: 'Nome do(a) cliente do pedido é muito grande',
	ERROR_ORDER_CLIENT_NAME_LESS_THAN_MIN_LENGTH: 'Nome do(a) cliente do pedido é muito pequeno',
	ERROR_ORDER_CLIENT_NAME_REQUIRED: 'Nome do(a) cliente do pedido é obrigatório',
	ERROR_ORDER_EVENT_INVALID: 'Os dados do evento do pedido estão inválidos',
	ERROR_ORDER_EVENT_REQUIRED: 'O evento do pedido é obrigatório',
	ERROR_ORDER_INVALID: 'Os dados do pedido estão inválidos',
	ERROR_ORDER_ITEM_INVALID: 'O item do pedido é inválido',
	ERROR_ORDER_ITEM_REQUIRED: 'O item do pedido é obrigatório',
	ERROR_ORDER_ITEM_VARIANT_INVALID: 'A variante do item do pedido é inválido',
	ERROR_ORDER_NOT_FOUND: 'Pedido não foi encontrado',
	ERROR_ORDER_OPERATOR_INVALID: 'Operador(a) do pedido é inválido',
	ERROR_ORDER_OPERATOR_REQUIRED: 'Operador(a) do pedido é obrigatório',

	ERROR_PRODUCT_INVALID: 'Os dados do produto estão inválidos',
	ERROR_PRODUCT_NAME_DUPLICATED: 'Um produto com esse nome já existe',
	ERROR_PRODUCT_NAME_GREATER_THAN_MAX_LENGTH: 'Nome do produto é muito grande',
	ERROR_PRODUCT_NAME_LESS_THAN_MIN_LENGTH: 'Nome do produto é muito pequeno',
	ERROR_PRODUCT_NAME_REQUIRED: 'Nome do produto é obrigatório',
	ERROR_PRODUCT_NOT_FOUND: 'Produto não foi encontrado',
	ERROR_PRODUCT_VARIANT_DUPLICATED: 'Variante do produto é duplicada',
	ERROR_PRODUCT_VARIANT_INVALID: 'Variante do produto é inválida',

	ERROR_VARIANT_INVALID: 'Os dados da variante de produto são inválidos',
	ERROR_VARIANT_NAME_DUPLICATED: 'Nome da variante de produto já existe',
	ERROR_VARIANT_NAME_GREATER_THAN_MAX_LENGTH: 'Nome da variante de produto é muito grande',
	ERROR_VARIANT_NAME_LESS_THAN_MIN_LENGTH: 'Nome da variante de produto é muito pequeno',
	ERROR_VARIANT_NAME_REQUIRED: 'Nome da variante de produto é obrigatório',
	ERROR_VARIANT_NOT_FOUND: 'Variante de produto não foi encontrada',
	ERROR_VARIANT_PRODUCT_INVALID: 'Produto da variante de produto é inválido',
	ERROR_VARIANT_PRODUCT_REQUIRED: 'Produto da variante de produto é obrigatório',

	ERROR_JWT_SETTINGS_INVALID:
		'Configurações do JWT são inválidas, por favor, contate do administrador',
	ERROR_JWT_ACCESS_TOKEN_SETTINGS_INVALID:
		'Configurações do token de acesso são inválidas, por favor, contate do administrador',
	ERROR_JWT_ACCESS_TOKEN_NOT_FOUND: 'Token de acesso é obrigatório',
	ERROR_JWT_ACCESS_TOKEN_INVALID: 'Token de acesso é inválido',
	ERROR_JWT_REFRESH_TOKEN_SETTINGS_INVALID:
		'Configurações do token de atualização são inválidas, por favor, contate do administrador',
	ERROR_JWT_REFRESH_TOKEN_NOT_FOUND: 'Token de atualização é obrigatório',
	ERROR_JWT_REFRESH_TOKEN_INVALID: 'Token de atualização é inválido',
} as InHouseLang;
