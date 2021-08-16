import Link from "next/link";
import React from "react";
import { MONEY_FORMAT } from "../helpers/formatter";

type RankingProps = {
  type: string;
  entries: any[];
};

function getLabels(type: string) {
  switch (type) {
    case "mostGoals":
      return {
        primary: "Goals",
        secondary: "Minutes played",
      };
    case "mostPledges":
      return {
        primary: "Pledges",
        secondary: "Money raised",
      };
    case "mostMoneyRaised":
      return {
        primary: "Money raised",
        secondary: "Pledges",
      };
  }
}

function getData(type: string, entry: any) {
  switch (type) {
    case "mostGoals":
      return {
        primary: entry.goals,
        secondary: entry.minutesPlayed,
      };
    case "mostPledges":
      return {
        primary: entry.count,
        secondary: MONEY_FORMAT.format(entry.money),
      };
    case "mostMoneyRaised":
      return {
        secondary: entry.count,
        primary: MONEY_FORMAT.format(entry.money),
      };
  }
}

const Ranking = ({ type, entries }: RankingProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="py-2 inline-block w-full lg:w-3/4 sm:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/2 sm:w-auto px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase table-cell">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                  Team
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                  {getLabels(type).secondary}
                </th>
                <th className="w-1/2 sm:w-auto px-6 py-3 text-right sm:text-center text-xs font-medium text-gray-500 uppercase table-cell">
                  {getLabels(type).primary}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => {
                return (
                  <tr key={entry.id}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="mr-4 flex-shrink-0 h-10 w-10">
                          <img
                            className="rounded-full"
                            alt="A"
                            src={
                              entry.image.length
                                ? entry.image[0].url
                                : "/img/avatar.png"
                            }
                          />
                        </div>
                        <div>
                          <div className="mt-4 sm:mt-0 text-sm font-medium text-gray-900">
                            <Link href={`/player/${entry.slug}`}>
                              <a>{entry.name}</a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 truncate hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {entry.team && (
                          <Link href={`/teams/${entry.team.slug}`}>
                            <a>{entry.team.name}</a>
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 truncate hidden sm:table-cell">
                      <div className="p-2 text-md font-semibold rounded-full text-grey-800 text-center">
                        {getData(type, entry).secondary}
                      </div>
                    </td>
                    <td className="px-4 py-4 table-cell">
                      <div className="p-2 text-md font-semibold rounded-full text-green-800 text-right sm:text-center">
                        {getData(type, entry).primary}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
