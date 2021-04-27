import React from "react";

type RankingProps = {
  type: string;
  entries: any[];
};

const MONEY_FORMAT = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Team
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  {getLabels(type).secondary}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getLabels(type).primary}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => {
                return (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
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
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {entry.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {entry.team && entry.team.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="p-2 text-md font-semibold rounded-full text-grey-800 text-center">
                        {getData(type, entry).secondary}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="p-2 text-md font-semibold rounded-full text-green-800 text-center">
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
