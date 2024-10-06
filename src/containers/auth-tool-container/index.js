import { memo, useCallback } from "react";
import AuthTool from "../../components/auth-tool";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function AuthToolContainer() {
  const store = useStore();
  const callbacks = {
    onExit: useCallback(() => store.actions.auth.exit(), []),
  };
  const selector = useSelector(state => ({
    authorized: state.auth.authorized,
    userName: state.profile.user? state.profile.user.profile.name : "",
  }));
  return (
      <AuthTool
        isAuthorized={selector.authorized}
        name={selector.userName}
        onExit={callbacks.onExit}
      />
  )
}

export default memo(AuthToolContainer);