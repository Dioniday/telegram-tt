import { memo, useEffect } from '@teact';
import { getActions } from '../../../global';

import captureEscKeyListener from '../../../util/captureEscKeyListener';

import useHistoryBack from '../../../hooks/useHistoryBack';
import useLang from '../../../hooks/useLang';
import useLastCallback from '../../../hooks/useLastCallback';
import useShowTransition from '../../../hooks/useShowTransition';

import Icon from '../../common/icons/Icon';
import Button from '../../ui/Button';

import styles from './SavedCleanup.module.scss';

export type OwnProps = {
  isOpen: boolean;
};

const SavedCleanup = ({ isOpen }: OwnProps) => {
  const { closeSavedCleanup } = getActions();

  const lang = useLang();

  const { ref, shouldRender } = useShowTransition({
    isOpen,
    withShouldRender: true,
  });

  const handleClose = useLastCallback(() => {
    closeSavedCleanup();
  });

  useEffect(() => (isOpen ? captureEscKeyListener(handleClose) : undefined), [isOpen, handleClose]);

  useHistoryBack({
    isActive: isOpen,
    onBack: handleClose,
  });

  if (!shouldRender) return undefined;

  return (
    <div ref={ref} className={styles.root}>
      <div className={styles.header}>
        <Button
          round
          color="translucent"
          size="smaller"
          ariaLabel={lang('Close')}
          onClick={handleClose}
        >
          <Icon name="close" />
        </Button>
        <h3 className={styles.title}>{lang('SavedCleanupTitle')}</h3>
      </div>
    </div>
  );
};

export default memo(SavedCleanup);
