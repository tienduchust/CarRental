using System.Collections.Generic;
using System.Linq;
using Orchestrator.Infrastructure;
using Orchestrator.Models;

namespace Orchestrator.Services
{
    public class ExecutorService : ServiceBase
    {
        protected static List<ExecutorModel> ExecutorList { get; }

        static ExecutorService()
        {
            ExecutorList = new List<ExecutorModel>
            {
                new ExecutorModel(1, "MAI HƯƠNG", "http://localhost:́́́́́́́́́́́́́8890"),
                new ExecutorModel(2, "THÙY CHI", "http://localhost:́́́́́́́́́́́́́8891")
            };
        }

        public virtual Result<List<ExecutorModel>> Search(string term = null)
        {
            if (!string.IsNullOrEmpty(term))
            {
                term = term.ToLower();
                term = term.Trim();

                var result =
                    ExecutorList
                    .Where(x =>
                        x.Name.ToLower().Contains(term) || x.Ip.ToLower().Contains(term)
                    )
                    .ToList();

                return Ok(result);
            }
            return Ok(ExecutorList);
        }

        //        public virtual Result<int> Add(PersonModel model)
        //        {
        //            if (model == null)
        //                return Error<int>();
        //            if (string.IsNullOrEmpty(model.FirstName))
        //                return Error<int>("First name not defined.");
        //            if (string.IsNullOrEmpty(model.LastName))
        //                return Error<int>("Last name not defined.");
        //
        //            TrimStrings(model);
        //
        //            var personExists =
        //                PeopleList
        //                .Any(x =>
        //                    x.FirstName == model.FirstName &&
        //                    x.LastName == model.LastName
        //                    );
        //            if (personExists)
        //            {
        //                return Error<int>("Person with the same first name and last name already exists.");
        //            }
        //
        //            var newId = PeopleList.Max(x => x?.Id ?? 0) + 1;
        //            model.Id = newId;
        //
        //            PeopleList.Add(model);
        //
        //            return Ok(model.Id);
        //        }
        //
        //        public virtual Result Update(PersonModel model)
        //        {
        //            if (model == null)
        //                return Error();
        //            if (model.Id <= 0)
        //                return Error($"{model.Id} <= 0.");
        //            var person = PeopleList.Where(x => x.Id == model.Id).FirstOrDefault();
        //            if (person == null)
        //                return Error($"Person with id = {model.Id} not found.");
        //
        //            TrimStrings(model);
        //
        //            var personExists =
        //                PeopleList
        //                .Any(x =>
        //                    x.Id != model.Id &&
        //                    x.FirstName == model.FirstName &&
        //                    x.LastName == model.LastName
        //                    );
        //            if (personExists)
        //            {
        //                return Error("Person with the same first name and last name already exists.");
        //            }
        //
        //            person.FirstName = model.FirstName;
        //            person.LastName = model.LastName;
        //
        //            return Ok();
        //        }
        //
        //        public virtual Result Delete(int id)
        //        {
        //            var unit = PeopleList.Where(x => x.Id == id).FirstOrDefault();
        //            if (unit == null)
        //                return Error($"Can't find person with Id = {id}.");
        //            PeopleList.Remove(unit);
        //            return Ok();
        //        }
        //
        //        private static void TrimStrings(PersonModel model)
        //        {
        //            model.FirstName = model.FirstName.Trim();
        //            model.LastName = model.LastName.Trim();
        //        }
    }
}