"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProjectVote = exports.postProjectComment = exports.getProjectComments = exports.postProject = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all projects
function getProjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const projects = yield prisma.project.findMany({
            include: {
                comments: true,
            },
        });
        res.status(200).send(projects);
    });
}
exports.getProjects = getProjects;
// Post a new project
function postProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, stack, timeline } = req.body;
        const newProject = yield prisma.project.create({
            data: {
                title,
                description,
                stack,
                timeline
            },
        });
        res.status(200).send(newProject);
    });
}
exports.postProject = postProject;
// Get comments for a specific project
function getProjectComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const comments = yield prisma.comment.findMany({
            where: {
                projectId: id
            },
        });
        res.status(200).send(comments);
    });
}
exports.getProjectComments = getProjectComments;
// Post a comment for a specific project
function postProjectComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { text } = req.body;
        const newComment = yield prisma.comment.create({
            data: {
                text,
                projectId: id,
            },
        });
        res.status(200).send(newComment);
    });
}
exports.postProjectComment = postProjectComment;
// Post a vote for a specific project
function postProjectVote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const project = yield prisma.project.findUnique({
            where: {
                id,
            },
        });
        if (!project) {
            res.status(404).send({ error: 'Project not found' });
            return;
        }
        const updatedProject = yield prisma.project.update({
            where: {
                id,
            },
            data: {
                votes: project.votes + 1,
            },
        });
        res.status(200).send(updatedProject);
    });
}
exports.postProjectVote = postProjectVote;