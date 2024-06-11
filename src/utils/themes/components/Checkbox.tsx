import { UseFormRegister } from "react-hook-form";

interface CheckboxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  options: {
     label: string;
     value: string 
  }[];
}

const Checkbox = ({ options, register, name}: CheckboxProps) => {

  return (
    <>
      {options.map((option) => (
        <div key={option.value} className="">
          <label className='text-sm p-2'>
            <input
              type="checkbox"
              id={name}
              value={option.value}
              {...register(name)}
            />
            <span className='p-1 text-[#00000094]'>  {option.label}</span>
          </label>
        </div>
      ))}
   
      </>
  );
};

export default Checkbox;
