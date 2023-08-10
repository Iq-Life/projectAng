import { Component, Inject, OnInit } from '@angular/core'
import { ProductsService } from '../product.service'
import { Observable, Subscription } from 'rxjs'
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms'
import { CountryDTO } from 'src/app/models/country'
import { DOCUMENT } from '@angular/common'
import { ModalService } from 'src/app/services/modal.service'

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.scss']
})
export class ModalAddProductComponent implements OnInit {
  productForm: FormGroup
  submitted = false

  constructor(
    private productsService: ProductsService,
    private modalService: ModalService,
    @Inject(DOCUMENT) private document: Document // это костыль для работы с DOM-деревом на прямую, в фреймворке очень много нативных средств для работы с ним, к нему прибегать в крайнем случае.
  ) {}

  readonly Items$: Observable<CountryDTO[]> = this.productsService.getCountry() // Название переменной не содержит понимание этой переменной (можно назвать countries) и она должна быть с маленькой буквы
  private fromEventSubscription: Subscription

  compareByIdFn(a: any, b: any): boolean {
    // Нормально типизировать параметры функции
    return a?.id === 3 || a?.id == 53 // Вместо цифр правильно было бы указывать Enum
  }

  private readonly patternValidation = '^[a-zA-Z0-9-!%_`~#$^&()}{.@-]+$'

  getFormGroup(): FormGroup {
    const result = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(256),
        Validators.pattern(this.patternValidation)
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.maxLength(256),
        Validators.pattern(this.patternValidation)
      ]),
      installmentPlan: new FormControl(null, [
        Validators.maxLength(256),
        Validators.pattern(this.patternValidation)
      ]),
      countryOfOrigin: new FormControl(null, [
        Validators.required,
        Validators.maxLength(256),
        Validators.pattern(this.patternValidation)
      ])
    })
    return result
  }
  errorField(field: string): ValidationErrors | null | undefined {
    return this.productForm.get(field)?.errors
  }
  isRequiredError(): boolean {
    const isRequiredError = Object.keys(this.productForm.controls).some(
      field => {
        const isError: boolean | undefined =
          this.productForm.get(field)?.errors?.required

        return isError
      }
    )
    return isRequiredError
  }
  isMaxLengthError(): boolean {
    console.log(this.productForm) // Урать console.log
    console.log(Object.keys(this.productForm.controls)) // Урать console.log
    const isMaxLengthError = Object.keys(this.productForm.controls).some(
      field => {
        const isError = this.productForm.get(field)?.errors?.maxlength

        this.errorClass(field, !!isError) // что бы не приравнивать значение к boolean каждый раз перед переменной, лучше сразу приравнять в 81 сроке при присваевании
        return !!isError
      }
    )
    return isMaxLengthError
  }

  errorClass(field: string, isError: boolean) {
    // не указанно что возвращает функция
    const htmlElement = this.document.getElementById(
      `product_${field}`
    ) as HTMLStyleElement
    console.log(field) // Урать console.log
    debugger // убрать debugger
    if (isError) {
      htmlElement.classList.add('red')
    } else {
      htmlElement.classList.remove('red')
    }
  } // в целом функция вмешивается в дом дерево и я бы рассмотрел другой подход в решение задачи функции

  changeCheckbox(event: boolean) {
    // бестолковая функция
    console.log(event)
  }

  submit(): void {
    this.submitted = true
    if (this.productForm.invalid) {
      return
    }
    const formData = this.productForm
    this.productsService.create(formData).subscribe({
      next: () => {
        this.modalService.close()
        this.submitted = false
      },
      error: () => {
        this.submitted = false
      }
    })
  }

  ngOnInit(): void {
    this.fromEventSubscription = this.productForm.valueChanges.subscribe() // От подписок надо отписываться
    this.productForm = this.getFormGroup()
  }
}
