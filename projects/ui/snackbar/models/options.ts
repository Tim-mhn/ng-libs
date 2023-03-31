export interface TimUISnackbarAction {
  text: string;
  action: () => void;
}

export interface TimUISnackBarOptions {
  dismissible?: boolean;
  duration?: number;
  mode?: 'default' | 'loading' | 'success' | 'error';
  action?: TimUISnackbarAction;
}
