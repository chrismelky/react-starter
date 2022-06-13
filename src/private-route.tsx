import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './config/store';
import ErrorBoundary from './utils/error-boundary';

export const PrivateRouteComponent = ({
  component: Component,
  hasAnyAuthorities = [],
  ...rest
}) => {
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  );
  const sessionHasBeenFetched = useAppSelector(
    (state) => state.authentication.sessionHasBeenFetched,
  );
  const user = useAppSelector((state) => state.authentication.user);
  const isAuthorized = hasAnyAuthority(user.authorities, hasAnyAuthorities);

  const Loading = () => {
    return <>Loading...</>;
  };

  const checkAuthorities = (props) =>
    isAuthorized ? (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
      </Suspense>
    ) : (
      <div className="insufficient-authority">
        <div className="alert alert-danger">
          You are not authorized to access this page.
        </div>
      </div>
    );

  if (!Component)
    throw new Error(
      `A component needs to be specified for private route for path ${
        (rest as any).path
      }`,
    );

  const renderRedirect = (props) => {
    if (!sessionHasBeenFetched) {
      return <div></div>;
    } else {
      return isAuthenticated ? (
        checkAuthorities(props)
      ) : (
        <Navigate to="/login" />
      );
    }
  };

  return renderRedirect(rest);
};

export const hasAnyAuthority = (
  authorities: string[],
  hasAnyAuthorities: string[],
) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return true;
};

export default PrivateRouteComponent;
