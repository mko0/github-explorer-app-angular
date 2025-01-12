import { Directive, effect, ElementRef, input } from '@angular/core';
import { Icon } from '../models/icon.model';

/**
 * Modifies the class and HTML of a button.
 *
 * @example
 * ```html
 *  <button geaBtn>Default</button>
 *  <button geaBtn geaBtnIcon="refresh" geaBtnLabel="Refresh" geaBtnSize="small"></button>
 *  <button geaBtn geaBtnIcon="search" geaBtnLabel="Search" geaBtnColor="primary" geaBtnRounded="right"></button>
 * ```
 */
@Directive({
  selector: '[geaBtn]',
  host: {
    type: 'button',
    class:
      'flex place-items-center shadow hover:cursor-pointer disabled:opacity-30 disabled:hover:cursor-not-allowed transition',
    '[class.rounded]': '!rounded()',
    '[class.rounded-tr-md]': 'rounded()==="right"',
    '[class.rounded-br-md]': 'rounded()==="right"',
    '[class.bg-white]': '!color()',
    '[class.text-gray-700]': '!color()',
    '[class.hover:text-black]': '!color()',
    '[class.hover:bg-gray-50]': '!color()',
    '[class.border]': '!color()',
    '[class.bg-blue-500]': 'color()==="primary"',
    '[class.text-white]': 'color()==="primary"',
    '[class.hover:bg-blue-600]': 'color()==="primary"',
    '[class.disabled:hover:bg-blue-500]': 'color()==="primary"',
    '[class.px-3]': '!size()',
    '[class.py-3]': '!size()',
    '[class.px-2]': 'size()==="small"',
    '[class.py-2]': 'size()==="small"',
    '[class.text-sm]': 'size()==="small"',
  },
})
export class ButtonDirective {
  readonly icon = input<undefined | Icon>(undefined, { alias: 'geaBtnIcon' });

  readonly label = input('', { alias: 'geaBtnLabel' });

  readonly rounded = input<undefined | 'right'>(undefined, {
    alias: 'geaBtnRounded',
  });

  readonly color = input<undefined | 'primary'>(undefined, {
    alias: 'geaBtnColor',
  });

  readonly size = input<undefined | 'small'>(undefined, {
    alias: 'geaBtnSize',
  });

  constructor(protected readonly elementRef: ElementRef) {
    effect(() => this.updateInnerHTML());
  }

  protected updateInnerHTML(): void {
    const icon = this.icon();

    if (icon) {
      const label = this.label();
      const style = this.size() === 'small' ? ' style="font-size: 20px"' : '';
      this.elementRef.nativeElement.innerHTML = `<span class="material-symbols-outlined"${style} data-cy="icon">${icon}</span>`;

      if (label) {
        this.elementRef.nativeElement.innerHTML += `<span class="pl-2" data-cy="label">${label}</span>`;
      }
    }
  }
}
