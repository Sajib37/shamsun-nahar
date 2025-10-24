import { achievements } from "../../assets/data/achievements";
import { BsCalendarDate } from "react-icons/bs";
import { motion } from "framer-motion";

const AchivementCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-8 md:gap-4">
      {achievements.map((achievement) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: achievement.id * 0.2 }}
          key={achievement.id}
          className="max-w-96 lg:w-full  overflow-hidden rounded-md mx-auto "
        >
          <div className="relative overflow-hidden w-16  lg:w-24 mx-auto">
            <img
              src={achievement.image}
              alt={achievement.title}
              className="h-full w-full object-cover  "
            />
          </div>
          <div className=" min-h-28 p-2 flex flex-col justify-center mx-auto text-center">
            <h3 className="text-emerald-400 font-bold text-lg">
              {achievement.title}
            </h3>
            <p className="text-base text-white">{achievement.description}</p>
            <span className="text-base text-white mt-2">
              <BsCalendarDate className="inline-block mr-1 text-emerald-400" />{" "}
              {achievement.year}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchivementCards;
