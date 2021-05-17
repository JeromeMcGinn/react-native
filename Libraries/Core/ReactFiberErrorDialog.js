/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

import {handleException, SyntheticError} from './ExceptionsManager';

import type {ExtendedError} from './Devtools/parseErrorStack';

export type CapturedError = {
  +componentStack: string,
  +error: mixed,
  +errorBoundary: ?{...},
  ...
};

const ReactFiberErrorDialog = {
  /**
   * Intercept lifecycle errors and ensure they are shown with the correct stack
   * trace within the native redbox component.
   */
  showErrorDialog({componentStack, error: errorValue}: CapturedError): boolean {
    let error: ?ExtendedError;

    // Typically, `errorValue` should be an error. However, other values such as
    // strings (or even null) are sometimes thrown.
    if (errorValue instanceof Error) {
      error = (errorValue: ExtendedError);
    } else if (typeof errorValue === 'string') {
      error = (new SyntheticError(errorValue): ExtendedError);
    } else {
      error = (new SyntheticError('Unspecified error'): ExtendedError);
    }
    try {
      error.componentStack = componentStack;
      error.isComponentError = true;
    } catch {
      // Ignored.
    }

    handleException(error, false);

    // Return false here to prevent ReactFiberErrorLogger default behavior of
    // logging error details to console.error. Calls to console.error are
    // automatically routed to the native redbox controller, which we've already
    // done above by calling ExceptionsManager.
    return false;
  },
};

export default ReactFiberErrorDialog;
