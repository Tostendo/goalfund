import { ITestimonial } from "../models/frontpage";

type Props = {
  testimonial: ITestimonial;
};

export const Testimonial = ({ testimonial }: Props) => {
  return (
    <div className="flex flex-col space-between max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-12">
      <div className="flex justify-center md:justify-end -mt-16">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-secondary"
          src={testimonial.image?.url || null}
        />
      </div>
      <div>
        <h2 className="text-primary text-2xl">{testimonial.headline}</h2>
        <p className="my-4 text-primary">{testimonial.copyText}</p>
      </div>
      <div className="flex justify-end mt-4 text-xl text-primary">
        {testimonial.name}
      </div>
    </div>
  );
};
