import MoodSelectButton from "../../components/Menu/MoodSelectButton";
import { MOOD_TYPES } from "../../constants/index";


export default function MenuPage() {
  const moodList = Object.values(MOOD_TYPES);

  return (
    <div>
      {moodList.map((mood) => <MoodSelectButton mood={mood} />)}
    </div>
  );
}
