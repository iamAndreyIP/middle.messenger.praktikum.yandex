import Block from "./utils/block";
import { leftPanel } from "./components/LeftPanel/leftPanel";
import { mainMenu } from "./pages/Menu/menu";
import { login } from "./pages/Login/login";
import { registration } from "./pages/Registration/registration";
import { notFound, fixIt } from "./pages/Errors/errors";
import { profile } from "./pages/Profile/profile";
import { chats } from "./pages/Chats/chats";

const template = `
<div class="container">
    {{{leftPanel}}}
    {{{mainMenu}}}
    {{{login}}}
    {{{registration}}}
    {{{notFound}}}
    {{{fixIt}}}
    {{{profile}}}
    {{{chats}}}
</div>
`;

class App extends Block {
  constructor(props: {}) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const app = new App({
  leftPanel: leftPanel,
  mainMenu: mainMenu,
  login: login,
  registration: registration,
  notFound: notFound,
  fixIt: fixIt,
  profile: profile,
  chats: chats,
});

export function getLocation() {
  if (window.location.pathname === "/") {
    mainMenu.show();
  } else {
    mainMenu.hide();
  }
  if (window.location.pathname === "/login") {
    login.show();
  } else {
    login.hide();
  }
  if (window.location.pathname === "/reg") {
    registration.show();
  } else {
    registration.hide();
  }
  if (window.location.pathname === "/404") {
    notFound.show();
  } else {
    notFound.hide();
  }
  if (window.location.pathname === "/500") {
    fixIt.show();
  } else {
    fixIt.hide();
  }
  if (window.location.pathname === "/profile") {
    profile.show();
  } else {
    profile.hide();
  }
  if (window.location.pathname === "/chats") {
    chats.show();
  } else {
    chats.hide();
  }
}
