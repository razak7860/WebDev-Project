import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const response = await getUserEnrolledCourses(token);
        //setEnrolledCourses(response.data);
      } catch (error) {
        console.log("Error in getEnrolledCourses", error);
      }
    };
    getEnrolledCourses();
  }, [token, enrolledCourses]);
  return (
    <div className="text-white">
      <div>
        {/* <div>Enrolled Courses</div> */}
        {console.log("Enrolled Courses are ", enrolledCourses)}
        {!enrolledCourses.length ? (
          <div>No courses enrolled</div>
        ) : (
          <div>
            <div>
              <p>Course Name</p>
              <p>Durations</p>
              <p>Progress</p>
            </div>
            {enrolledCourses.map((course) => (
              <div key={course._id}>
                <div>
                  <div>
                    <img
                      src={course.thumbnail}
                      alt={`course-${course.name}`}
                      className="aspect-square w-[78px] object-cover"
                    />
                    <div>
                      <p>{course?.courseName}</p>
                      <p>{course?.courseDescription}</p>
                    </div>
                  </div>
                  <div>
                    <p>{course?.totalDuration}</p>
                  </div>

                  <div>
                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course?.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
