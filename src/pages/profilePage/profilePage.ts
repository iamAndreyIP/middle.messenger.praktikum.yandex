import Link from '../../components/Link/link';
import Button from '../../components/Button/button';
import Block from '../../utils/block';
import { Avatar } from '../../components/Avatar/avatar';
import store, { StoreEvents } from '../../utils/store';
import AuthController from '../../controllers/authcontroller';
import { template } from './profilePageTemplate';
import { ChangeProfileData } from './changeProfileData';
import UserController from '../../controllers/userController';
import { isEqual } from '../../utils/helpers';
import Modal from '../../components/Modal/modal';
import Input from '../../components/Input/input';
import SidePanel from '../../components/SidePanel/sidePanel';
import Icon from '../../components/Icons/icons';
import { BlueArrow2 } from '../../components/Icons/iconsTemplates';
import { router } from '../../..';

function mapStateToProps(state: any) {
  return {
    changeAvatarModalFlag: state.changeAvatarModalFlag,
    currentUser: state.currentUser,
    changeDataFlag: state.changeDataFlag,
  };
}

export default class ProfilePage extends Block {
  constructor(props: {} | undefined) {
    super({ ...props, ...mapStateToProps(store.getState()) });

    store.on(StoreEvents.UPDATED, () => {
      this.setProps({ ...mapStateToProps(store.getState()) });
      this.children.changeData.setProps({
        ...mapStateToProps(store.getState()),
      });
    });
  }

  protected addChild(): void {
    //@ts-ignore
    this.children.profileActions = [
      new Link({
        linkHref: '#',
        linkClass: 'profile__nav-link',
        linkText: 'Изменить данные',
        events: {
          click: function (e) {
            e.preventDefault();
            store.set('changeDataFlag', true);

            document.querySelector('.modal')?.classList.toggle('hidde');
          },
        },
      }),

      new Link({
        linkHref: '/change-password',
        linkClass: 'profile__nav-link',
        linkText: 'Изменить Пароль',
        events: {
          click: function (e) {
            e.preventDefault();
            store.set('changeDataFlag', false);

            document.querySelector('.modal')?.classList.toggle('hidde');
          },
        },
      }),

      new Link({
        linkHref: '#',
        linkClass: 'profile__nav-link',
        linkText: 'Выйти',
        events: {
          click: function (e) {
            e.preventDefault();

            AuthController.logout();
          },
        },
      }),
    ];

    this.children.profileAvatar = new Avatar({
      avatarLink: new Link({
        linkClass: 'link avatar-link',
        linkHref: '',
        linkText: 'Изменить аватар',
        events: {
          click: function (e) {
            e.preventDefault();

            store.set('changeAvatarModalFlag', true);
          },
        },
      }),
    });

    this.children.changeData = new ChangeProfileData({
      saveBtn: new Button({
        buttonClass: 'btn',
        buttonText: 'Сохранить',
        events: {
          click: (e) => {
            const obj: any = {};
            const inputs: HTMLInputElement | any = [
              ...document.querySelectorAll('.modal input'),
            ].forEach((input: any) => {
              obj[input.name] = input.value;
            });

            const answer = confirm('are you sure change data?');

            if (answer) {
              const { email, second_name, first_name, login, phone }: any =
                store.getState()?.currentUser;
              const obj1: any = {
                email,
                second_name,
                first_name,
                login,
                phone,
              };

              if (store.getState().changeDataFlag) {
                !isEqual(obj, obj1)
                  ? UserController.changeProfile({
                      ...obj,
                      display_name: obj.login,
                    })
                  : console.log('false', obj1);
              } else {
                !isEqual(obj, obj1)
                  ? UserController.changePassword({
                      oldPassword: obj.password,

                      newPassword: obj.new_password,
                    })
                  : console.log('false', obj1);
              }

              const modal = document.querySelector('.modal');
              modal?.classList.toggle('hidde');
            }
          },
        },
      }),
      currentUser: this.props.currentUser,
      events: {
        click: function (e) {
          const modal = document.querySelector('.modal');

          if (e.target === modal) {
            modal?.classList.toggle('hidde');
            store.set('changeDataFlag', false);
          }
        },
      },
    });

    this.children.changeAvatarModal = new Modal({
      modalInput: new Input({
        inputClass: 'input input-file',
        inputId: 'avatar',
        inputName: 'avatar',
        inputPlaceholder: '',
        inputType: 'file',
        inputValue: '',
      }),
      modalTitle: 'Добавить\\Изменить аватар',
      modalButton: new Button({
        buttonClass: 'btn',
        buttonText: 'Сохранить',
        events: {
          click: (event) => {
            event.preventDefault();
            const avatar: any = document.getElementById('avatar');
            const form = new FormData();

            if (avatar) {
              form.append('avatar', avatar.files[0]);

              UserController.changeUserAvatar(form);

              store.set('changeAvatarModalFlag', false);
            }
          },
        },
      }),
      events: {
        click: function (e: { target: Element | null }) {
          const modal = document.querySelector('.modal');

          if (e.target === modal) {
            modal?.classList.toggle('hidde');
          }
        },
      },
    });

    this.children.leftPanel = new SidePanel({
      leftArrowIcon: new Icon(
        {
          events: {
            click: (e) => {
              router.back();
            },
          },
        },
        BlueArrow2
      ),
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
