import React, { FC, ReactNode, Ref } from 'react';
import { DropdowndateContextType, ChangeParams, Attrs } from '../../../types';
export interface DropdowndatesContext {
    children?: ReactNode;
    name: string;
    inputChange: (args: ChangeParams) => void;
    format?: string;
    maxDate?: string;
    minDate?: string;
    attrs?: Attrs;
    value?: string | undefined;
    ddClassName?: string;
    mmClassName?: string;
    yyClassName?: string;
    ddLabel?: string;
    mmLabel?: string;
    yyLabel?: string;
    ddDefaultLabel?: string;
    mmDefaultLabel?: string;
    yyDefaultLabel?: string;
    displayOrder?: string;
    mmmm?: boolean;
    dropDownDatesRef: Ref<HTMLDivElement>;
}
export declare const DropDownDatesContext: React.Context<DropdowndateContextType>;
export declare const DropDownDatesProvider: FC<DropdowndatesContext>;
export default DropDownDatesProvider;
