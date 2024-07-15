import {
  createNavigationContainerRef,
  NavigationState,
  PartialState,
} from "@react-navigation/native";

export const exitRoutes = ["welcome"];
type AppStackParamList = {};

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
): string {
  const route = state.routes[state.index ?? 0];

  // Found the active route -- return the name
  if (!route.state) return route.name as keyof AppStackParamList;

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state as NavigationState<AppStackParamList>);
}
