import { motion, AnimatePresence } from "framer-motion";
import { HospitalProfile, TechnicianProfile } from "../MedShift_Phase10_11.jsx";

const ProfileOverlay = ({ show, role, onBack, onCall }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          style={{ width: "100%", height: "100%" }}
        >
          {role === "manager" ? (
            <TechnicianProfile onBack={onBack} onCall={onCall} />
          ) : (
            <HospitalProfile onBack={onBack} onCall={onCall} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileOverlay;
