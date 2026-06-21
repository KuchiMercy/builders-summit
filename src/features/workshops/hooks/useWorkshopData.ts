import { useState, useEffect } from "react";
import { getActiveWorkshop, getWorkshopById, getOtherWorkshops } from "../../../data/workshops";
import type { WorkshopData } from "../../../data/workshops";
import { useNavigate } from "react-router-dom";

interface UseWorkshopDataResult {
  workshop: WorkshopData | null;
  otherWorkshops: WorkshopData[];
  isUpcoming: boolean;
  isLoading: boolean;
}

export const useWorkshopData = (id?: string): UseWorkshopDataResult => {
  const [workshop, setWorkshop] = useState<WorkshopData | null>(null);
  const [otherWorkshops, setOtherWorkshops] = useState<WorkshopData[]>([]);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate slight delay to allow smooth transitions (enterprise feel)
    // In a real app with CMS, this would be an actual network request.
    const timer = setTimeout(() => {
      let foundWorkshop: WorkshopData | undefined;
      
      if (id) {
        foundWorkshop = getWorkshopById(id);
      } else {
        foundWorkshop = getActiveWorkshop();
      }

      if (!foundWorkshop || !foundWorkshop.isActive) {
        console.warn(`Workshop with id ${id} not found or is inactive. Redirecting to home.`);
        navigate("/", { replace: true });
        return;
      }

      setWorkshop(foundWorkshop);
      setOtherWorkshops(getOtherWorkshops(foundWorkshop.id));
      setIsUpcoming(new Date() < foundWorkshop.date);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  return { workshop, otherWorkshops, isUpcoming, isLoading };
};
