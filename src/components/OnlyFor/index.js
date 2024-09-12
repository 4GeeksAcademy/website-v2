import React, { useContext } from 'react'
import { SessionContext } from "../../session";


 const OnlyFor = ({ locations, children }) => {
  const { session } = useContext(SessionContext);

  const userLocation = session?.location?.breathecode_location_slug;

  if (!locations.includes(userLocation)) return null;

  return (
    <>
      {children}
    </>
  )
}

export default OnlyFor;
