

    export function getJobId() {
        const id = localStorage.getItem("id")
        if (id) {
          return JSON.parse(id)["jobId"]
        }
        return resp.id
      }
