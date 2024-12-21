import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div>
      <h1>My Profile</h1>
      {console.log("User is ", user)}
      {/* Section 1 */}
      <div>
        <div>
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <IconBtn text="Edit" onClick={() => navigate("/dashboard/settings")} />
      </div>

      {/* Section 2 */}
      <div>
        <div>
          <p>About</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          />
        </div>
        <p>
          {user?.additionalDetails?.about ?? "Write Something about yourself"}
        </p>
      </div>

      {/* Section 3 */}

      <div>
        <div>
          <p>Personal details</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          />
        </div>
        <div>
          <p>First Name</p>
          <p>{user?.firstName}</p>
        </div>
        <div>
          <p>Email</p>
          <p>{user?.email}</p>
        </div>

        <div>
          <p>Gender</p>
          <p>{user?.additionalDetails?.gender ?? "Add your gender"}</p>
        </div>

        <div>
          <p>Last Name</p>
          <p>{user?.lastName}</p>
        </div>

        <div>
          <p>Contact Number</p>
          <p>
            {user?.additionalDetails.contactNumber ?? "Add Contact number"}{" "}
          </p>
        </div>

        <div>
          <p>Date of Birth</p>
          <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of birth"}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
