import { UseFormRegister } from "react-hook-form";



export interface InputProps {
    name: string;
    label?: string;
    register: UseFormRegister<any>;
    type?: string;
    placeholder?: string;
    readonly: boolean;

    // onChange: string;
}

