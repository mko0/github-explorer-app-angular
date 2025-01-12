import { Component, input, signal } from '@angular/core';
import { ButtonDirective } from './button.directive';
import { Icon } from '../models/icon.model';

enum TestCaseType {
  SubmitButtonType,
  ButtonWithIcon,
  SmallButtonWithIcon,
  ButtonWithIconAndLabel,
  SmallButton,
  ButtonWithPrimaryColor,
  ButtonRightRounded,
}

@Component({
  template: ` @switch (case()) {
    @case (testCase.ButtonRightRounded) {
      <button geaBtn geaBtnRounded="right">?</button>
    }
    @case (testCase.ButtonWithPrimaryColor) {
      <button geaBtn geaBtnColor="primary">?</button>
    }
    @case (testCase.SmallButton) {
      <button geaBtn geaBtnSize="small">?</button>
    }
    @case (testCase.ButtonWithIconAndLabel) {
      <button geaBtn [geaBtnIcon]="icon()" [geaBtnLabel]="label()">?</button>
    }
    @case (testCase.SmallButtonWithIcon) {
      <button geaBtn [geaBtnIcon]="icon()" geaBtnSize="small">?</button>
    }
    @case (testCase.ButtonWithIcon) {
      <button geaBtn [geaBtnIcon]="icon()">?</button>
    }
    @case (testCase.SubmitButtonType) {
      <button type="submit" geaBtn>{{ label() }}</button>
    }
    @default {
      <button geaBtn>{{ label() }}</button>
    }
  }`,
  imports: [ButtonDirective],
})
export class WrapperComponent {
  readonly testCase = TestCaseType;
  case = input<TestCaseType>();
  label = input('');
  icon = input<Icon | undefined>(undefined);
}

describe('ButtonDirective', () => {
  const BUTTON_EL = 'button';
  const ICON_EL = '[data-cy="icon"]';
  const LABEL_EL = '[data-cy="label"]';
  const iconClass = 'material-symbols-outlined';

  describe('[geaBtn]', () => {
    it('should label contain text', () => {
      const label = 'test_label';

      cy.mount(WrapperComponent, {
        componentProperties: {
          label: signal(label) as any,
        },
      });

      cy.get(BUTTON_EL).contains(label);
    });

    it('should have styling of a button', () => {
      const cssClasses =
        'flex place-items-center shadow hover:cursor-pointer disabled:opacity-30 disabled:hover:cursor-not-allowed transition rounded bg-white text-gray-700 hover:text-black hover:bg-gray-50 border px-3 py-3';

      cy.mount(WrapperComponent);

      cy.get(BUTTON_EL).should('have.class', cssClasses);
    });

    it('should have button type', () => {
      cy.mount(WrapperComponent);

      cy.get(BUTTON_EL).should('attr', 'type', 'button');
    });

    it('should have submit type', () => {
      cy.mount(WrapperComponent, {
        componentProperties: {
          case: signal(TestCaseType.SubmitButtonType) as any,
        },
      });

      cy.get(BUTTON_EL).should('attr', 'type', 'submit');
    });
  });

  describe('[geaBtn] [geaBtnIcon]', () => {
    const icon: Icon = 'refresh';
    const setup = () =>
      cy.mount(WrapperComponent, {
        componentProperties: {
          case: signal(TestCaseType.ButtonWithIconAndLabel) as any,
          icon: signal(icon) as any,
        },
      });

    it('should icon element have icon class', () => {
      setup();

      cy.get(ICON_EL).should('have.class', iconClass);
    });

    it('should icon element have icon name as text', () => {
      setup();

      cy.get(ICON_EL).should('have.text', icon);
    });

    it('should label element not exist', () => {
      setup();

      cy.get(LABEL_EL).should('not.exist');
    });

    describe('geaBtnSize="small', () => {
      const icon: Icon = 'refresh';
      const setup = () =>
        cy.mount(WrapperComponent, {
          componentProperties: {
            case: signal(TestCaseType.SmallButtonWithIcon) as any,
            icon: signal(icon) as any,
          },
        });

      it('should icon element have small size', () => {
        setup();

        cy.get(ICON_EL).should('have.attr', 'style', 'font-size: 20px');
      });
    });

    describe('[geaBtnLabel]', () => {
      const label = 'test_label';
      const icon: Icon = 'search';
      const setup = () =>
        cy.mount(WrapperComponent, {
          componentProperties: {
            case: signal(TestCaseType.ButtonWithIconAndLabel) as any,
            label: signal(label) as any,
            icon: signal(icon) as any,
          },
        });

      it('should label element have text class', () => {
        const labelClass = 'pl-2';

        setup();

        cy.get(LABEL_EL).should('have.class', labelClass);
      });

      it('should label element have label as text', () => {
        setup();

        cy.get(LABEL_EL).should('have.text', label);
      });
    });
  });

  describe('[geaBtn] geaBtnSize="small', () => {
    it('should have styling of a small button', () => {
      const cssClasses =
        'flex place-items-center shadow hover:cursor-pointer disabled:opacity-30 disabled:hover:cursor-not-allowed transition rounded bg-white text-gray-700 hover:text-black hover:bg-gray-50 border px-2 py-2 text-sm';

      cy.mount(WrapperComponent, {
        componentProperties: {
          case: signal(TestCaseType.SmallButton) as any,
        },
      });

      cy.get(BUTTON_EL).should('have.class', cssClasses);
    });
  });

  describe('[geaBtn] geaBtnColor="primary', () => {
    it('should have styling of a button with primary color', () => {
      const cssClasses =
        'flex place-items-center shadow hover:cursor-pointer disabled:opacity-30 disabled:hover:cursor-not-allowed transition rounded bg-blue-500 text-white hover:bg-blue-600 disabled:hover:bg-blue-500 px-3 py-3';

      cy.mount(WrapperComponent, {
        componentProperties: {
          case: signal(TestCaseType.ButtonWithPrimaryColor) as any,
        },
      });

      cy.get(BUTTON_EL).should('have.class', cssClasses);
    });
  });

  describe('[geaBtn] geaBtnRounded="right', () => {
    it('should have styling of a button rounded only on the right side', () => {
      const cssClasses =
        'flex place-items-center shadow hover:cursor-pointer disabled:opacity-30 disabled:hover:cursor-not-allowed transition rounded-tr-md rounded-br-md bg-white text-gray-700 hover:text-black hover:bg-gray-50 border px-3 py-3';

      cy.mount(WrapperComponent, {
        componentProperties: {
          case: signal(TestCaseType.ButtonRightRounded) as any,
        },
      });

      cy.get(BUTTON_EL).should('have.class', cssClasses);
    });
  });
});
