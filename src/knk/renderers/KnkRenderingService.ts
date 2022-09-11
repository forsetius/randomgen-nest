import { Inject, Injectable } from '@nestjs/common';
import { RendererInterface } from '../../app/render/RendererInterface';
import { RendererType } from '../../app/render/RendererType';
import { Faction } from '../domain/Faction';
import { JsonKnkRenderer } from './JsonKnkRenderer';

@Injectable()
export class KnkRenderingService {
  protected renderers: Record<RendererType, RendererInterface>;

  public constructor(
    @Inject() html: HtmlKnkRenderer,
    @Inject() json: JsonKnkRenderer,
    @Inject() xlsx: XlsxlKnkRenderer,
  ) {
    this.renderers = { html, json, xlsx };
  }

  public render(type: RendererType, data: Faction[]) {
    this.renderers[type].render(data);
  }
}
