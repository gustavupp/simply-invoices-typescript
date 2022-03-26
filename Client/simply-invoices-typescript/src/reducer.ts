import { Invoice, UserInfoInterface, StateInterface } from './interfaces'

type Action =
  | { type: 'SET_IS_PAGINATION_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_PAGE_INDEX'; payload: number }
  | { type: 'SET_IS_INVOICE_LOADING'; payload: boolean }
  | { type: 'SET_IS_EDITING_INVOICE'; payload: boolean }
  | {
      type: 'SET_TOTALS'
      payload: { globalTotal: number; fiscalYearTotal: number }
    }
  | { type: 'SET_AMOUNT_OF_PAGES'; payload: number }
  | { type: 'SET_INVOICES'; payload: Invoice[] }
  | { type: 'ADD_USER_INFO'; payload: UserInfoInterface }
  | { type: 'SET_IS_USER_SETTINGS_LOADING'; payload: boolean }

export const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'SET_INVOICES':
      return { ...state, invoices: action.payload }

    case 'SET_IS_EDITING_INVOICE':
      return { ...state, isEditingInvoice: action.payload }

    case 'ADD_USER_INFO':
      return { ...state, userInfo: action.payload }

    case 'SET_IS_INVOICE_LOADING':
      return { ...state, isInvoiceLoading: action.payload }

    case 'SET_IS_USER_SETTINGS_LOADING':
      return { ...state, isUserSettingsLoading: action.payload }

    case 'SET_AMOUNT_OF_PAGES':
      return { ...state, amountOfPages: action.payload }

    case 'SET_TOTALS':
      return { ...state, totals: action.payload }

    case 'SET_IS_PAGINATION_LOADING':
      return { ...state, isPaginationLoading: action.payload }

    case 'SET_CURRENT_PAGE_INDEX':
      return { ...state, currentPage: action.payload }

    default:
      return state
  }
}
