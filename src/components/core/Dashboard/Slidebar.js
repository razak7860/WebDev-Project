import React from "react";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../common/ConfirmationModal";
import { set } from "react-hook-form";
import { VscSignOut } from "react-icons/vsc";

const Slidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(false);

  if (authLoading || profileLoading) {
    return <div className="mt-10">Loading.......</div>;
  }
  return (
    <div className="text-white">
      <div className="flex flex-col min-w-[222px] border-r-[1px] border-r-richblack-700 h-[cal(100vh-3.5rem)] py-10 bg-richblack-800">
        <div className="flex flex-col">
          {console.log("User is ", user)}
          {sidebarLinks.map((link, index) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure you want to logout?",
                text2: "You will be logged out of your account",
                btn1Text: "Logout.....",
                btn2Text: "Cancel........",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            <div className="flex items-center">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Slidebar;
