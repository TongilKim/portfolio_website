import { CheckCircle } from "lucide-react";

const skills = [
  "React & Next.js",
  "TypeScript & JavaScript",
  "Tailwind CSS & Styled Components",
  "Responsive Design",
  "SEO & Performance",
  "E-Commerce Solutions",
  "RESTful APIs",
  "Git & Version Control"
];

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl mb-6">About Me</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                I'm a passionate freelance web developer with over 5 years of experience 
                creating beautiful, functional websites for clients worldwide.
              </p>
              <p>
                My approach combines technical expertise with creative design thinking 
                to deliver websites that not only look great but also drive real business results.
              </p>
              <p>
                Whether you're a startup looking for your first website or an established 
                business wanting to upgrade your online presence, I'm here to help you succeed.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Skills & Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <p className="text-lg italic">
                "Success is not about the tools you use, but how you use them to solve 
                real problems for real people."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
