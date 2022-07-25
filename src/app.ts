import Block from "./utils/block";
import { notFound } from "./pages/404";
import { fixIt } from "./pages/500";
import { login } from "./pages/login";
import { registration } from "./pages/registration";
import { profile } from "./pages/profile";
import { leftPanel } from "./components/leftPanel/leftPanel";
import { mainMenu } from "./pages/menu";
import { chats } from "./pages/chats";

const template = `
<div class="container">
    {{{leftPanel}}}
    {{{mainMenu}}}
    {{{login}}}
    {{{registration}}}
    {{{profile}}}
    {{{notFound}}}
    {{{fixIt}}}
    {{{chats}}}
</div>
`;

class App extends Block {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const app = new App({
  login: login,
  registration: registration,
  profile: profile,
  notFound: notFound,
  fixIt: fixIt,
  leftPanel: leftPanel,
  mainMenu: mainMenu,
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
