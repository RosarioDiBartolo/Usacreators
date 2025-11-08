import { AnyFieldApi } from "@tanstack/react-form";

export const getFieldErrors = (field: AnyFieldApi)=>(
    field.state.meta.errorMap.onChange? field.state.meta.errorMap.onChange: []
)