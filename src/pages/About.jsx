import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Sparkles,
  Quote,
} from "lucide-react";

const About = () => {
  return (
    <div className="bg-[var(--color-bg-page)] page-transition">
      {/* Header Section */}
      <div className="text-3xl text-center pt-24 pb-10 border-t border-gray-100">
        <Title text1={"OUR"} text2={"STORY"} />
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mt-4">
          Honoring Heritage, Defining Dignity
        </p>
      </div>

      {/* Narrative Section */}
      <div className="my-10 flex flex-col md:flex-row items-center gap-16 px-4 md:px-20">
        <div className="relative w-full md:max-w-[450px]">
          <div className="absolute -top-4 -left-4 w-full h-full border border-[#00311F]/10 -z-10 rounded-2xl"></div>
          <img
            className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/5]"
            src={assets.about_img}
            alt="Heritage and Craftsmanship"
          />
          {/* Floating Quote Badge */}
          <div className="absolute -bottom-6 -right-6 bg-[#00311F] text-white p-6 rounded-xl hidden md:block max-w-[200px] shadow-xl">
            <Quote size={20} className="mb-2 opacity-50" />
            <p className="text-xs italic font-light tracking-wide">
              Real elegance speaks softly and lasts forever.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 leading-relaxed font-light">
          {/* Reflective Heading */}
          <h2 className="text-3xl font-serif text-[var(--color-primary-dark)] leading-tight">
            A Return to <span className="italic">Hayaa</span> &{" "}
            <span className="italic">Waqaar</span>
          </h2>

          <div className="space-y-4 text-base italic text-gray-500 border-l-2 border-[var(--color-accent-lime)]/30 pl-6 py-2">
            <p>
              There was a time when{" "}
              <b className="text-[var(--color-primary-dark)] font-normal italic">Hayaa (حیا)</b>{" "}
              was admired. When{" "}
              <b className="text-[var(--color-primary-dark)] font-normal italic">Waqaar (وقار)</b>{" "}
              was reflected in the way we dressed. When craftsmanship was
              respected, and every piece carried meaning.
            </p>
          </div>

          <p className="mt-2">
            Today, as fast fashion and loud trends take over, many of our
            beautiful traditions are slowly fading. The appreciation for modest
            clothing, timeless jewelry, and soft, refined fragrances is becoming
            rare.
          </p>

          <p>
            We created this brand to honor that legacy. Our collections are
            inspired by heritage and designed with intention: modest
            silhouettes, elegant jewelry, and delicate fragrances that reflect
            grace and dignity. Each piece is made for those who value{" "}
            <span className="text-[var(--color-primary-dark)] font-medium">
              simplicity, culture, and refinement.
            </span>
          </p>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group mt-4">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Sparkles size={40} className="text-[var(--color-accent-lime)]" />
            </div>
            <h3 className="text-[var(--color-primary-dark)] font-serif text-xl block mb-3 italic">
              Our Philosophy: “Modest and Unique”
            </h3>
            <p className="text-sm font-light">
              True style is not about attention; it is about <b>presence</b>. It
              is about feeling confident, polished, and authentic without being
              excessive.
            </p>
          </div>
        </div>
      </div>

      {/* The Values Section */}
      <div className="text-2xl py-12 px-4 md:px-20 text-center">
        <Title text1={"THE"} text2={"ESSENCE"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm px-4 md:px-20 gap-8 mb-24">
        {[
          {
            title: "Sadaqat (صداقت)",
            desc: "Representing character and truth. We design for those who carry honesty in their heart and reflect it in their aura.",
            icon: <ShieldCheck className="text-[var(--color-accent-lime)]" size={28} />,
          },
          {
            title: "Nazakat (نزاكت)",
            desc: "Delicacy in every stitch. We prioritize soft, refined aesthetics that honor the traditional art of grace.",
            icon: <Zap className="text-[var(--color-accent-lime)]" size={28} />,
          },
          {
            title: "Intentioned Design",
            desc: "Every silhouette is crafted to provide modesty without compromising on modern sophistication.",
            icon: <HeartHandshake className="text-[var(--color-accent-lime)]" size={28} />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 px-8 py-10 flex flex-col items-center text-center gap-4 rounded-3xl hover:shadow-lg transition-all duration-500 flex-1"
          >
            <div className="w-16 h-16 bg-[var(--color-bg-cream-light)] flex items-center justify-center rounded-full mb-2">
              {item.icon}
            </div>
            <b className="font-serif text-xl text-[var(--color-primary-dark)]">{item.title}</b>
            <p className="text-gray-500 font-light leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Major Closing Statement */}
      <div className="w-full bg-[var(--color-primary-dark)] text-white py-24 mb-20 px-6 text-center relative overflow-hidden">
        {/* Subtle Decorative Arabic Text Overlay (Optional/Stylized) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <span className="text-[15rem] font-serif">حیا</span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif italic mb-6 leading-tight">
            &quot;Real elegance does not need to be loud. It speaks softly and lasts
            forever.&quot;
          </h2>
          <div className="h-[1px] w-20 bg-[var(--color-accent-lime)] mx-auto mb-6"></div>
          <p className="text-xs tracking-[0.5em] uppercase opacity-70">
            Honoring the Legacy of Grace
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
