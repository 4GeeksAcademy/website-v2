import React, { useState, useContext, useEffect } from "react";
import { H4, Paragraph } from "../Heading";
import { Colors, Button, Link } from "../Styling";
import { Div } from "../Sections";
import { SessionContext } from "../../session";
import { dateDifference } from "../../utils/utils.js";

const CustomBar = ({
  isContentBarActive,
  contentBar,
  discountContent,
  showDiscount,
  display_md,
  display_xxs,
  position,
}) => {
  const [timer, setTimer] = useState({});

  const differenceInWeeks = (date1, date2) => {
    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    const difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert the difference to weeks
    // const difference_weeks = Math.floor(difference_ms / (1000 * 60 * 60 * 24 * 7));
    const difference_weeks = difference_ms / (1000 * 60 * 60 * 24 * 7);

    return difference_weeks;
  };

  const addWeeks = (date, weeks) => {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
  };

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      let referenceDate = new Date("2024-04-01");
      // let referenceDate = new Date('2024-03-24');
      const now = new Date();
      const weeksDifference = differenceInWeeks(referenceDate, now);
      const weekGap = weeksDifference % 2;
      if (weekGap === 0) {
        referenceDate = addWeeks(referenceDate, weeksDifference + 2);
      } else {
        if (weeksDifference < 2) {
          referenceDate = addWeeks(referenceDate, 2);
        } else {
          referenceDate = addWeeks(referenceDate, weeksDifference + weekGap);
        }
      }

      const intervalDurationObj = dateDifference(referenceDate, now);

      setTimer({
        days: intervalDurationObj.days,
        hours: intervalDurationObj.hours,
        minutes: intervalDurationObj.minutes,
        seconds: intervalDurationObj.seconds,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Div
      id="custom-bar"
      display_md={isContentBarActive ? display_md : "none"}
      display_xxs={isContentBarActive ? display_xxs : "none"}
      style={{ top: "0px" }}
      width="100%"
      height="auto"
      minHeight="50px"
      padding="10px 20px"
      alignItems="center"
      background="#0097CD"
      justifyContent={showDiscount && "center"}
      gap={showDiscount && "10px"}
      position={position}
    >
      {showDiscount ? (
        <>
          <Paragraph
            color={Colors.white}
            textAlign="center"
            maxWidth="fit-content"
            padding="0 10px"
            // padding_tablet="0 5%"
            fontSize="15px"
            lineHeight="22px"
            opacity="1"
          >
            {discountContent.bar_content.discount.message}
            <span style={{ fontWeight: "900" }}>
              {"  "}
              {discountContent.bar_content.discount.ends_in}
              {"  "}
              {timer.days && timer.days !== 0 && (
                <>
                  {timer.days}d{"  "}
                </>
              )}
              {timer.hours && timer.hours !== 0 && (
                <>
                  {timer.hours}h{"  "}
                </>
              )}
              {timer.minutes && timer.minutes !== 0 && (
                <>
                  {timer.minutes}m{"  "}
                </>
              )}
              {timer.seconds}s
            </span>
          </Paragraph>
          <Link
            to={discountContent.bar_content.discount.button.path}
            style={{ padding: "0" }}
          >
            <Button
              variant="full"
              style={{ height: "34px", padding: "16px 20px" }}
              width="100%"
              width_tablet="max-content"
              background={Colors.black}
              color={Colors.white}
            >
              {discountContent.bar_content.discount.button.label}
            </Button>
          </Link>
        </>
      ) : (
        <>
          {contentBar.message && (
            <Paragraph
              dangerouslySetInnerHTML={{ __html: contentBar.message }}
              color={Colors.white}
              textAlign="center"
              padding="0 10px"
              padding_tablet="0 12%"
              fontSize="15px"
              lineHeight="22px"
            />
          )}
          {contentBar.button?.label !== undefined &&
            contentBar.button?.label !== "" && (
              <Div alignItems="center" justifyContent="between">
                <Link to={contentBar.button.path || "#"}>
                  <Button
                    variant="full"
                    style={{ height: "34px", padding: "16px 20px" }}
                    width="100%"
                    width_tablet="max-content"
                    color={Colors.black}
                    textColor={Colors.white}
                  >
                    {contentBar.button.label}
                  </Button>
                </Link>
              </Div>
            )}
        </>
      )}
    </Div>
  );
};

export default CustomBar;
