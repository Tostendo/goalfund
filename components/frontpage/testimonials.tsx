import { ITestimonials } from "../../models/frontpage";
import { Testimonial } from "../testimonial";

export const Testimonials = ({ content }: { content: ITestimonials }) => {
  return (
    <div className="mt-32 flex items-center flex-col max-w-screen-xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {content.testimonials.map((testimonial) => {
          return (
            <Testimonial key={testimonial.name} testimonial={testimonial} />
          );
        })}
      </div>
    </div>
  );
};
