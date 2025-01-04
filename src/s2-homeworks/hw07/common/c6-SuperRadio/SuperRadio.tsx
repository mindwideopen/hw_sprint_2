import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from 'react'
import s from './SuperRadio.module.css'
import {log} from "node:util";

type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
>

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    options?: any[]
    onChangeOption?: (option: any) => void

    spanProps?: DefaultSpanPropsType // пропсы для спана
}

const SuperRadio: React.FC<SuperRadioPropsType> = ({
                                                       id,
                                                       name,
                                                       className,
                                                       options,
                                                       value,
                                                       onChange,
                                                       onChangeOption,
                                                       spanProps,
                                                       ...restProps
                                                   }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
       onChangeOption && onChangeOption(Number(e.currentTarget.value))



    }

    const finalRadioClassName = s.radio + (className ? ' ' + className : '')
    const spanClassName = s.span + (spanProps?.className ? ' ' + spanProps.className : '')

    const mappedOptions: any[] = options
        ? options.map((o) => {
                // console.log(value)
                // console.log(o.id)
                console.log(o.value)

            return (
                <label key={name + '-' + o.id} className={s.label}>
                    <input
                        id={id + '-input-' + o.id}
                        className={finalRadioClassName}
                        type={'radio'}
                        name={'radioButton'} //  для группирования радиокнопок. по идее одинаковый должен быть
                        value={o.id} //  Для передачи информации
                        checked={o.id===value}  //для значения по умолчанию
                        onChange={onChangeCallback}

                        {...restProps}
                    />
                    <span
                        id={id + '-span-' + o.id}
                        {...spanProps}
                        className={spanClassName}
                    >
                      {o.value}
                  </span>
                </label>
            )
        }
            )
        : []

    return <div className={s.options}>{mappedOptions}</div>
}

export default SuperRadio
