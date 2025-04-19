from fastapi import APIRouter, Query, HTTPException
from ..schemas.plan import PlanResponse, PlanCreate, PlanUpdate, PlanPaginationResponse, PlanResponseWithTaskLists
from ..services.plan import PlanService
from ..services.task_list import TaskListService
from typing import Union
from ..schemas.common import convert_object_ids


router = APIRouter(prefix="/api/v1/plans", tags=["Plans"])


@router.post("/", response_model=PlanResponse, status_code=201)
async def create_plan(plan: PlanCreate):
    return await PlanService.create(plan)


@router.get("/", response_model=PlanPaginationResponse, name="Get all plans")
async def find_all_plans(limit: int = Query(10, ge=1, le=100),
                         skip: int = Query(0, ge=0),
                         search: str = ""):
    return await PlanService.find_all(limit=limit, skip=skip, search=search)


@router.get("/{plan_id}", response_model=Union[PlanResponseWithTaskLists, PlanResponse], name="Get plan by id with task lists")
async def find_plan_by_id_with_task_lists(plan_id: str, include_task_lists: bool = False):
    plan = await PlanService.find_by_id(plan_id)
    if include_task_lists:
        if not plan:
            raise HTTPException(status_code=404, detail="Plan not found")

        plan_obj = convert_object_ids(plan.model_dump(by_alias=True))
        task_lists = await TaskListService.find_all(plan_id=plan_id)
        task_list_objs = [convert_object_ids(task_list.model_dump(
            by_alias=True)) for task_list in task_lists]

        return PlanResponseWithTaskLists(task_lists=task_list_objs, **plan_obj)
    else:
        return plan


@router.patch("/{plan_id}", response_model=PlanResponse, name="Update plan")
async def update_plan(plan_id: str, plan: PlanUpdate):
    return await PlanService.update(plan_id=plan_id, data=plan)


@router.delete("/{plan_id}", name="Delete plan")
async def delete_plan(plan_id: str):
    return await PlanService.delete(plan_id=plan_id)
