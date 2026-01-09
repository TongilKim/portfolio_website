import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ContactV2() {
  return (
    <section id="contact" className="bg-gray-50 border-y">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl mb-8">Let's talk</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have a project in mind? Send me a message and I'll get back to you within 24 hours.
            </p>
            <div className="space-y-4 text-gray-600">
              <div>
                <div className="text-sm mb-1">Email</div>
                <div>hello@webcraft.com</div>
              </div>
              <div>
                <div className="text-sm mb-1">Phone</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Name
                </label>
                <Input id="name" className="border-gray-300" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email
                </label>
                <Input id="email" type="email" className="border-gray-300" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  className="border-gray-300"
                />
              </div>

              <button
                type="submit"
                className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors w-full md:w-auto"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
