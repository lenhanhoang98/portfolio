import fs from 'fs';

const appFile = 'src/App.jsx';
let appCode = fs.readFileSync(appFile, 'utf8');

// The new ContactBubble component
const bubbleCode = `function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="contactBubbleWrap">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="contactBubbleList"
            initial={{ opacity: 0, y: 30, scale: 0.8, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.8, filter: 'blur(5px)' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <a href={'tel:' + content.contact.info.phone.replace(/[^0-9+]/g, '')} className="bubbleItem bubbleItem--phone" aria-label="Phone">
               <span className="bubbleItem__txt">{content.contact.info.phone}</span> <div className="bubbleItem__icon"><FaPhone /></div> 
            </a>
            <a href={'mailto:' + content.contact.info.email} className="bubbleItem bubbleItem--email" aria-label="Email">
               <span className="bubbleItem__txt">{content.contact.info.email}</span> <div className="bubbleItem__icon"><FaEnvelope /></div> 
            </a>
            <a href={content.contact.info.social.includes('in') ? 'https://linkedin.com/in/lenhanhoang98' : '#'} target="_blank" rel="noreferrer" className="bubbleItem bubbleItem--linkedin" aria-label="LinkedIn">
               <span className="bubbleItem__txt">LinkedIn</span> <div className="bubbleItem__icon"><FaLinkedinIn /></div> 
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className={'contactBubbleBtn ' + (isOpen ? 'isOpen' : '')}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="icon-default"><FaEnvelope /></div>
        <div className="icon-close">✕</div>
      </motion.button>
    </div>
  )
}

export default function App() {`;

appCode = appCode.replace('export default function App() {', bubbleCode);

// Remove contact section
const contactRegex = /<section className="section container snap-section" id="contact">[\s\S]*?<\/section>/;
appCode = appCode.replace(contactRegex, '');

// Insert <ContactBubble /> right above <footer
appCode = appCode.replace(/<footer className="footer">/, '<ContactBubble />\n\n      <footer className="footer">');

fs.writeFileSync(appFile, appCode, 'utf8');
