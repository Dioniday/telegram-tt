import type { OwnProps } from './SavedCleanup';

import { Bundles } from '../../../util/moduleLoader';

import useModuleLoader from '../../../hooks/useModuleLoader';

const SavedCleanupAsync = (props: OwnProps) => {
  const { isOpen } = props;
  const SavedCleanup = useModuleLoader(Bundles.Extra, 'SavedCleanup', !isOpen, true);

  return SavedCleanup ? <SavedCleanup {...props} /> : undefined;
};

export default SavedCleanupAsync;
