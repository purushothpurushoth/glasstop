import { CampaignUserRes } from "src/app/shared/upload-campaign-employees/upload-campaign-employees.interface";

export const GET_EMPLOYEE_LIST_RESPONSE: CampaignUserRes = {
        campaignEndUser: [
          {
            campaignUserId: 1,
            firstName: "john",
            lastName: "smith",
            email: "john@gmail.com"
          },
          {
            campaignUserId: 2,
            firstName: "john",
            lastName: "smith",
            email: "john@gmail.com"
          },
          {
            campaignUserId: 3,
            firstName: "john",
            lastName: "smith",
            email: "john@gmail.com"
          },
          {
            campaignUserId: 4,
            firstName: "jon",
            lastName: "kovi",
            email: "jonkovi@ideas2it.com"
          },
          {
            campaignUserId: 5,
            firstName: "Kate",
            lastName: "Williams",
            email: "kate@gmail.com"
          },
          {
            campaignUserId: 6,
            firstName: "Kate",
            lastName: "Williams",
            email: "kate@gmail.com"
          },
          {
            campaignUserId: 7,
            firstName: "Kate",
            lastName: "Williams",
            email: "kate@gmail.com"
          },
          {
            campaignUserId: 8,
            firstName: "Kate",
            lastName: "Williams",
            email: "kate@gmail.com"
          },
          {
            campaignUserId: 9,
            firstName: "Kate",
            lastName: "Williams",
            email: "kate@gmail.com"
          },
          {
            campaignUserId: 10,
            firstName: "Kate",
            lastName: "Williams",
            email: "kate@gmail.com"
          }
        ],
        totalCount: 10,
        searchTotalCount: 10,
        statusCode: 200,
        statusMessage: "Success"
};