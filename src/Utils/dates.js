import {DateTime} from "luxon";

export const dateBeautifier = (dateString) => {
    if (!dateString) {
        return null;
    }

    const date = DateTime.fromISO(dateString);
    const difference = DateTime.local().diff(date, ["days"]).toObject();

    if (difference.days < 3) {
        const relative = date.toRelative();
        return relative;
    } else {
        return date.toFormat("M/d/yy");
    }
};