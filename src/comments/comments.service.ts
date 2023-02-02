import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comments.entity';
import { Repository } from 'typeorm';
import { VoteSubject } from '../vote-subjects/entities/vote-subject.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>,
  ) {}

  async findBestComments(voteSubjectId: string) {
    const commentA = await this.repository.findOne({
      where: {
        voteType: 'AGREE',
        voteSubject: voteSubjectId,
        parentId: null,
      },
      order: {
        likeCount: 'DESC',
      },
    });

    const commentB = await this.repository.findOne({
      where: {
        voteType: 'DISAGREE',
        voteSubject: voteSubjectId,
        parentId: null,
      },
      order: {
        likeCount: 'DESC',
      },
    });

    return { commentA, commentB };
  }

  async commentRegister(
    voteSubject: VoteSubject,
    userId: string,
    voteType: string,
    comment: string,
  ) {
    return await this.repository.save({
      voteSubject,
      userId,
      voteType,
      comment,
    });
  }
}
