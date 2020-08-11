import { Observable, of } from 'rxjs';

// Helper functions that return actions with "An unknown error occurred" message
// if they couldn't find the path to the appropriate error message within the server's response body

export const observableResponseErrorWrapper = (
  action: any,
  error: object,
  pathToErrorMessage: any[],
  messageToDisplay: string
): Observable<any> => {
  try {
    while (pathToErrorMessage.length) {
      error = error[pathToErrorMessage.shift()];
    }
    return of(action(messageToDisplay));
  } catch (err) {
    return of(action('An unknown error occurred'));
  }
};

export const nonObservableResponseErrorWrapper = (
  action: any,
  error: object,
  pathToErrorMessage: any[],
  messageToDisplay: string
): any => {
  try {
    while (pathToErrorMessage.length) {
      error = error[pathToErrorMessage.shift()];
    }
    return action(messageToDisplay);
  } catch (err) {
    return action('An unknown error occurred');
  }
};
