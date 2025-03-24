import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="bg-accent rounded-lg absolute -top-4 -left-4 w-full h-full -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1617419086540-518c5b847b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80" 
                alt="AMIX International Group Office" 
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 title-shadow">About AMIX International Group</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Based in Hanoi, AMIX International Group Vietnam LLC serves as a bridge connecting global businesses 
              with opportunities in the ASEAN region. With our deep understanding of local markets and international 
              business practices, we help companies navigate the complexities of doing business in Vietnam and 
              neighboring countries.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Our team combines local expertise with global vision to provide comprehensive solutions 
              across multiple sectors including import/export, IT, real estate, and strategic partnerships. 
              We take pride in our collaboration with Vietbuild Corp and other industry leaders to deliver 
              exceptional value to our clients.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-accent text-3xl font-montserrat font-bold mb-2">10+</div>
                <p className="text-slate-300">Years of Experience</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-accent text-3xl font-montserrat font-bold mb-2">200+</div>
                <p className="text-slate-300">Successful Projects</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="text-accent text-3xl font-montserrat font-bold mb-2">50+</div>
                <p className="text-slate-300">Global Partners</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="text-accent text-3xl font-montserrat font-bold mb-2">5</div>
                <p className="text-slate-300">ASEAN Countries</p>
              </motion.div>
            </div>
            
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
              className="btn-primary font-montserrat"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
