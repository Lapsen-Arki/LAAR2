export interface SubscriptionData {
  created: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

export interface ConfirmationDialogProps {
  subscriptionCancelled: boolean | undefined;
  onCancelSubscription: () => Promise<void>;
  onStartSubscription: () => Promise<void>;
  open: boolean;
  onClose: () => void;
}
