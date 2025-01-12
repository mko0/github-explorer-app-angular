import { FormControl, FormGroup } from '@angular/forms';
import { requiredValidator } from '../../shared/validators/required-validator.function';
import { NonNullableObject } from '../../shared/models/not-nullable-object.model';

/** Search form class. */
export class SearchForm extends FormGroup<{
  username: FormControl<string | null>;
}> {
  constructor() {
    super({
      username: new FormControl<string>('', requiredValidator('Username')),
    });
  }
}
/** Search form value. */
export type SearchFormValue = NonNullableObject<
  ReturnType<(typeof SearchForm.prototype)['getRawValue']>
>;
